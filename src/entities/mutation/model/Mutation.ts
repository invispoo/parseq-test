import axios from "axios";

export class Mutation {
  /*mutationId: string;
    mutationType: string;
    maybeHgvsGdna: string;
    maybeTrivialName: string;
    analysesTranscripts: [
        string
    ];
    analyses: [
        {
            analysisId: string;
            sampleName: string;
            sequencingRunName: string
        }
    ];
    inAnalysis: true;
    organizationFrequencyRatio: 0;
    maybeHighestTier: IV;
    isAnnotatedByAmp: true;
    isAnnotatedByAcmg: true;
    therapeuticAnnotations: [
        {
            organizationName: string;
            isPublic: true;
            evidenceLevel: IV;
            referenceLinks: [
                string
            ];
            tumorType: string;
            drugTradeName: string;
            drugName: string;
            sensitivity: string
        }
    ];
    diagnosticAnnotations: [
        {
            organizationName: string;
            isPublic: true;
            evidenceLevel: IV;
            referenceLinks: [
                string
            ];
            tumorType: string;
            tumorSubtype: string
        }
    ];
    prognosticAnnotations: [
        {
            organizationName: string;
            isPublic: true;
            evidenceLevel: IV;
            referenceLinks: [
                string
            ];
            tumorType: string;
            prognosis: string
        }
    ];
    lowTierAnnotations: [
        {
            organizationName: string;
            isPublic: true;
            evidenceLevel: IV;
            referenceLinks: [
                string
            ]
        }
    ];
    acmgAnnotations: [
        {
            organizationName: string;
            isPublic: true;
            acmgSignificances: BENIGN;
            theses: {};
            transcriptId: string
        }
    ];
    hasPrivateAnnotations: true;
    sentToAnnotation: true;
    drugs: [
        string
    ];
    maybeReferenceGenomeContigId: string;
    maybeChrNumber: string;*/

    static async fetchAllByPage (pageNumber: number, pageSize: number) {
        return (await axios.get(
            '/mutations',
            {
                params: {
                    pageZeroBasedNumber: pageNumber,
                    pageSize: pageSize,
                }
            }
        )).data
    }
}
