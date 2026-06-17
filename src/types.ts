export interface ServiceCard {
  id: string;
  title: string;
  text: string;
  category: string;
}

export interface ContactFormInputs {
  fullname: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  privacyConsent: boolean;
}

export interface ApproccioPrincipio {
  title: string;
  description: string;
  iconName: string;
}
