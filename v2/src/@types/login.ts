interface EmailLoginType {
  email: string;
  password: string;
}

interface EmailLoginRequestType {
  data: EmailLoginType;
}

export type { EmailLoginType, EmailLoginRequestType };
