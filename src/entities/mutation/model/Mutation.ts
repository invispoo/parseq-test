type MutationType = 'SNP' | 'FUSION' | 'CNV';

type HighestTier = 'IV' | 'III' | 'II-D' | 'II-C' | 'I-B' | 'I-A';

type AcmgSignificances = 'BENIGN' | 'LIKELY_BENIGN' | 'UNCERTAIN' | 'LIKELY_PATHOGENIC' | 'PATHOGENIC';

type AnalysisIdentier = {
  analysisId: string;
  sampleName: string;
  sequencingRunName: string;
};

type TherapeuticAnnotation = {
  organizationName: string;
  isPublic: boolean;
  evidenceLevel: HighestTier;
  referenceLinks: string[];
  tumorType: string;
  drugTradeName: string;
  drugName: string;
  sensitivity: string;
};

type DiagnosticAnnotation = {
  organizationName: string;
  isPublic: boolean;
  evidenceLevel: HighestTier;
  referenceLinks: string[];
  tumorType: string;
  tumorSubtype: string;
};

type PrognosticAnnotation = {
  organizationName: string;
  isPublic: boolean;
  evidenceLevel: HighestTier;
  referenceLinks: string[];
  tumorType: string;
  prognosis: string;
};

type LowTierAnnotation = {
  organizationName: string;
  isPublic: boolean;
  evidenceLevel: HighestTier;
  referenceLinks: string[];
};

type AcmgAnnotation = {
  organizationName: string;
  isPublic: boolean;
  acmgSignificances: AcmgSignificances;
  theses: object;
  transcriptId: string;
};

export class Mutation {
  mutationId: string;
  mutationType: MutationType;
  maybeHgvsGdna?: string;
  maybeTrivialName?: string;
  analysesTranscripts: string[];
  analyses: AnalysisIdentier[];
  inAnalysis: boolean;
  organizationFrequencyRatio: number;
  maybeHighestTier?: HighestTier;
  isAnnotatedByAmp: boolean;
  isAnnotatedByAcmg: boolean;
  therapeuticAnnotations: TherapeuticAnnotation[];
  diagnosticAnnotations: DiagnosticAnnotation[];
  prognosticAnnotations: PrognosticAnnotation[];
  lowTierAnnotations: LowTierAnnotation[];
  acmgAnnotations: AcmgAnnotation[];
  hasPrivateAnnotations: boolean;
  sentToAnnotation: boolean;
  drugs: string[];
  maybeReferenceGenomeContigId?: string;
  maybeChrNumber?: string;
}
