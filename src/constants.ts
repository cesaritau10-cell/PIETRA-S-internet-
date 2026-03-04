export interface InternetPlan {
  id: string;
  provider: string;
  name: string;
  speed: string;
  speedValue: number; // in Mbps
  uploadSpeed: string;
  price: number;
  technology: 'Fiber' | 'Cable' | '5G';
  contractTerm: 'Mensal' | '12 Meses' | '24 Meses';
  features: string[];
}

export const MOCK_PLANS: InternetPlan[] = [
  {
    id: '1',
    provider: 'Vivo',
    name: 'Vivo Fibra 500 Mega',
    speed: '500 Mbps',
    speedValue: 500,
    uploadSpeed: '250 Mbps',
    price: 120.00,
    technology: 'Fiber',
    contractTerm: '12 Meses',
    features: ['Wi-Fi 6 Grátis', 'Vivo Play App', 'Instalação Grátis']
  },
  {
    id: '2',
    provider: 'Claro',
    name: 'Claro Net Vírtua 750 Mega',
    speed: '750 Mbps',
    speedValue: 750,
    uploadSpeed: '375 Mbps',
    price: 139.90,
    technology: 'Cable',
    contractTerm: '12 Meses',
    features: ['Globoplay Incluso', 'Wi-Fi Plus', 'Ponto Ultra']
  },
  {
    id: '3',
    provider: 'Oi',
    name: 'Oi Fibra 1 Giga',
    speed: '1 Gbps',
    speedValue: 1000,
    uploadSpeed: '500 Mbps',
    price: 199.90,
    technology: 'Fiber',
    contractTerm: 'Mensal',
    features: ['Oi Expert', 'Wi-Fi 5', 'Sem fidelidade']
  },
  {
    id: '4',
    provider: 'Vero',
    name: 'Vero Internet 600 Mega',
    speed: '600 Mbps',
    speedValue: 600,
    uploadSpeed: '300 Mbps',
    price: 110.00,
    technology: 'Fiber',
    contractTerm: '12 Meses',
    features: ['Local Provider', 'Suporte 24h', 'Wi-Fi incluso']
  },
  {
    id: '5',
    provider: 'Vivo',
    name: 'Vivo Fibra 300 Mega',
    speed: '300 Mbps',
    speedValue: 300,
    uploadSpeed: '150 Mbps',
    price: 99.90,
    technology: 'Fiber',
    contractTerm: '12 Meses',
    features: ['Wi-Fi Grátis', 'Vivo Play App']
  },
  {
    id: '6',
    provider: 'Claro',
    name: 'Claro 5G Móvel 100GB',
    speed: '100 Mbps',
    speedValue: 100,
    uploadSpeed: '20 Mbps',
    price: 89.90,
    technology: '5G',
    contractTerm: 'Mensal',
    features: ['Mobilidade Total', 'Redes Sociais Ilimitadas']
  }
];
