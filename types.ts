export enum VoiceName {
  Puck = 'Puck',
  Charon = 'Charon',
  Kore = 'Kore',
  Fenrir = 'Fenrir',
  Zephyr = 'Zephyr',
}

export enum AgentType {
  Receptionist = 'Receptionist',
  Emergency = 'Emergency',
}

export interface AgentConfig {
  type: AgentType;
  name: string;
  role: string;
  description: string;
  systemInstruction: string;
  defaultVoice: VoiceName;
}

export interface AudioStreamConfig {
  sampleRate: number;
}