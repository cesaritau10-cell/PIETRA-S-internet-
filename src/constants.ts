export interface InternetPlan {
  id: string;
  provider: string;
  name: string;
  speed: string;
  price: number;
  technology: 'Fiber' | 'Cable' | '5G';
  features: string[];
}

export const MOCK_PLANS: InternetPlan[] = [
  {
    id: '1',
    provider: 'Vivo',
    name: 'Vivo Fibra 500 Mega',
    speed: '500 Mbps',
    price: 120.00,
    technology: 'Fiber',
    features: ['Wi-Fi 6 Grátis', 'Vivo Play App', 'Instalação Grátis']
  },
  {
    id: '2',
    provider: 'Claro',
    name: 'Claro Net Vírtua 750 Mega',
    speed: '750 Mbps',
    price: 139.90,
    technology: 'Cable',
    features: ['Globoplay Incluso', 'Wi-Fi Plus', 'Ponto Ultra']
  },
  {
    id: '3',
    provider: 'Oi',
    name: 'Oi Fibra 1 Giga',
    speed: '1 Gbps',
    price: 199.90,
    technology: 'Fiber',
    features: ['Oi Expert', 'Wi-Fi 5', 'Sem fidelidade']
  },
  {
    id: '4',
    provider: 'Vero',
    name: 'Vero Internet 600 Mega',
    speed: '600 Mbps',
    price: 110.00,
    technology: 'Fiber',
    features: ['Local Provider', 'Suporte 24h', 'Wi-Fi incluso']
  }
];
