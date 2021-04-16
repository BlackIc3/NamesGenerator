#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>

typedef struct
{
    int id;
    float latitude;
    float longitude;
    int clusterLabel;
} Poi;

typedef struct
{
    int amount;
    Poi **pois;
} Neighbors;

Poi *parsePoiList(char *path, int numPois)
{
    FILE *file;
    file = fopen(path, "r");
    if (file == NULL)
    {
        printf("No file '%s' found!", path);
        exit(1);
    }
    char line[1024];

    //parse pois
    Poi *pois = malloc(numPois * sizeof(Poi));
    for (int i = 0; i < numPois; i++)
    {
        fgets(line, 1024, file);
        pois[i].id = atoi(strtok(line, ","));
        pois[i].latitude = atof(strtok(NULL, ","));
        pois[i].longitude = atof(strtok(NULL, ","));
        pois[i].clusterLabel = -1;
    }

    return pois;
}

void outputPoiList(Poi *pois, int numPois, char *filename)
{
    FILE *outfile;
    outfile = fopen(filename, "w");
    if (outfile == NULL)
    {
        printf("Error while opening '%s'!", filename);
        exit(1);
    }

    for (int i = 0; i < numPois; i++)
    {
        Poi p = pois[i];
        fprintf(outfile, "%i;%i\n", p.id, p.clusterLabel);
    }
    fclose(outfile);
}

float calcDistance(Poi a, Poi b)
{
    //printf("[i] a: (%f, %f) | b: (%f, %f)\n", a.latitude, a.longitude, b.latitude, b.longitude);
    return sqrt(pow(a.latitude - b.latitude, 2) + pow(a.longitude - b.longitude, 2) * 1.0);
}

Neighbors *findNeighbors(Poi p, Poi *pois, int numPois, float epsilon)
{
    Neighbors *neighbors = malloc(sizeof(Neighbors));
    neighbors->amount = 0;
    neighbors->pois = malloc(numPois * numPois * sizeof(Poi*));
    for (Poi *poiPointer = pois; poiPointer < pois + numPois; ++poiPointer)
    {
        float distance = calcDistance(p, *poiPointer);
        //printf("[i] %i -> %i: %f\n", p.id, poiPointer->id, distance);
        if (distance < epsilon)
        {
            neighbors->pois[neighbors->amount] = poiPointer;
            neighbors->amount++;
        }
    }

    return neighbors;
}

int dbScan(Poi *pois, int numPois, float epsilon, int minPois)
{
    int clusterID = 0;
    for (Poi *p = pois; p < pois + numPois; ++p)
    {
        if (p->clusterLabel > -1)
            continue;
        Neighbors *neighbors_p = findNeighbors(*p, pois, numPois, epsilon);
        if (neighbors_p->amount < minPois)
        {
            p->clusterLabel = 0;
            free(neighbors_p->pois);
            free(neighbors_p);
            continue;
        }

        clusterID++;
        p->clusterLabel = clusterID;

        int appendCounter = neighbors_p->amount;
        for (Poi *q = *neighbors_p->pois; q < *neighbors_p->pois + appendCounter - 1; ++q)
        {
            if (q->clusterLabel == 0)
                q->clusterLabel = clusterID;
            if (q->clusterLabel > -1)
                continue;
            q->clusterLabel = clusterID;

            Neighbors *neighbors_q = findNeighbors(*q, pois, numPois, epsilon);
            if (neighbors_q->amount > minPois)
            {
                for (int y = 0; y < neighbors_q->amount; y++)
                {
                    neighbors_p->pois[appendCounter] = neighbors_q->pois[y];
                    appendCounter++;
                }
                neighbors_p->amount = neighbors_p->amount + neighbors_q->amount;
            }

            free(neighbors_q->pois);
            free(neighbors_q);
        }

        free(neighbors_p->pois);
        free(neighbors_p);
    }

    return clusterID;
}

int main(int argc, char **argv)
{
    if (argc < 4)
    {
        printf("Wrong argument count, expected 5!\n");
        printf("Usage: clusterFinder.exe <input File> <number of POIs> <output File> <epsilon> <minPois> \n");
        exit(1);
    }

    char *inPath = (char *)argv[1];
    int numPois = atoi((char *)argv[2]);
    char *outPath = (char *)argv[3];
    float epsilon = atof((char *)argv[4]);
    int minPois = atoi((char *)argv[5]);

    printf("[i] Exectuing DBSCAN for %i loaded POIs with e = %f and minPois = %i\n", numPois, epsilon, minPois);

    Poi *pois = parsePoiList(inPath, numPois);
    printf("[i] Parsed '%s'\n", inPath);

    int clustersAmount = dbScan(pois, numPois, epsilon, minPois);
    printf("[i] Found %i clusters\n", clustersAmount);

    outputPoiList(pois, numPois, outPath);
    printf("[i] Saved data to %s\n", outPath);

    free(pois);
}
