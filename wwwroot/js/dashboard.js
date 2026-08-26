/**
 * Clínica Vitta - Unified Dashboard Controller & Reactive Data Engine
 * Handles tab switching, search/filters, dynamic pagination, date navigation,
 * dynamic calculations of percentages & statistics, and synchronized widgets.
 */

// ============================================================
// 1. DATA STORE (REACTIVE IN-MEMORY DATASET)
// ============================================================

const patientsData = [
    {
        id: 'p1',
        name: 'João Silva',
        initials: 'JS',
        age: '34 anos',
        gender: 'Masculino',
        cpf: '123.456.789-00',
        phone: '(28) 99988-1234',
        plan: 'Particular',
        planLabel: 'Particular',
        planClass: 'particular',
        lastConsult: 'Hoje, 08:00',
        lastDoctor: 'Dra. Marina Souza',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Paciente em acompanhamento fisioterapêutico para reabilitação lombar. Apresenta boa evolução clínica.'
    },
    {
        id: 'p2',
        name: 'Ana Costa',
        initials: 'AC',
        age: '29 anos',
        gender: 'Feminino',
        cpf: '234.567.890-11',
        phone: '(28) 99877-4321',
        plan: 'Unimed',
        planLabel: 'Unimed VTRM',
        planClass: 'unimed',
        lastConsult: 'Hoje, 09:30',
        lastDoctor: 'Dr. Felipe Santos',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Paciente em tratamento odontológico de rotina e profilaxia sem queixas de sensibilidade.'
    },
    {
        id: 'p3',
        name: 'Patrícia Branco',
        initials: 'PB',
        age: '42 anos',
        gender: 'Feminino',
        cpf: '345.678.901-22',
        phone: '(28) 99766-5544',
        plan: 'Bradesco',
        planLabel: 'Bradesco Saúde',
        planClass: 'bradesco',
        lastConsult: 'Hoje, 10:00',
        lastDoctor: 'Dra. Beatriz Lima',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Sessões semanais de psicoterapia com foco em manejo de estresse e qualidade do sono.'
    },
    {
        id: 'p4',
        name: 'André Martins',
        initials: 'AM',
        age: '51 anos',
        gender: 'Masculino',
        cpf: '456.789.012-33',
        phone: '(28) 99655-8899',
        plan: 'Unimed',
        planLabel: 'Unimed VTRM',
        planClass: 'unimed',
        lastConsult: 'Hoje, 11:30',
        lastDoctor: 'Dra. Marina Souza',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Reabilitação do ombro direito após cirurgia artroscópica. Boa amplitude articular.'
    },
    {
        id: 'p5',
        name: 'Fernanda Lima',
        initials: 'FL',
        age: '26 anos',
        gender: 'Feminino',
        cpf: '567.890.123-44',
        phone: '(28) 99544-2211',
        plan: 'Particular',
        planLabel: 'Particular',
        planClass: 'particular',
        lastConsult: '12/03/2026',
        lastDoctor: 'Dr. Carlos Eduardo',
        status: 'inativo',
        attendedThisMonth: false,
        notes: 'Checkup cardiológico anual. Ritmo sinusal normal. Exames dentro dos parâmetros.'
    },
    {
        id: 'p6',
        name: 'Lucas Ribeiro',
        initials: 'LR',
        age: '38 anos',
        gender: 'Masculino',
        cpf: '678.901.234-55',
        phone: '(28) 99433-1100',
        plan: 'Unimed',
        planLabel: 'Unimed VTRM',
        planClass: 'unimed',
        lastConsult: '23/08/2026',
        lastDoctor: 'Dr. Felipe Santos',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Limpeza, profilaxia e restauração estética no dente 14. Excelente recuperação.'
    },
    {
        id: 'p7',
        name: 'Mariana Alvares',
        initials: 'MA',
        age: '31 anos',
        gender: 'Feminino',
        cpf: '789.012.345-66',
        phone: '(28) 99322-8877',
        plan: 'Bradesco',
        planLabel: 'Bradesco Saúde',
        planClass: 'bradesco',
        lastConsult: '23/08/2026',
        lastDoctor: 'Dra. Beatriz Lima',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Acompanhamento psicológico quinzenal. Paciente assídua e participativa.'
    },
    {
        id: 'p8',
        name: 'Roberto Rocha',
        initials: 'RR',
        age: '62 anos',
        gender: 'Masculino',
        cpf: '890.123.456-77',
        phone: '(28) 99211-7766',
        plan: 'Particular',
        planLabel: 'Particular',
        planClass: 'particular',
        lastConsult: '22/08/2026',
        lastDoctor: 'Dr. Carlos Eduardo',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Hipertensão arterial sistêmica controlada com medicação. ECG estável.'
    },
    {
        id: 'p9',
        name: 'Camila Nogueira',
        initials: 'CN',
        age: '45 anos',
        gender: 'Feminino',
        cpf: '901.234.567-88',
        phone: '(28) 99100-6655',
        plan: 'Amil',
        planLabel: 'Outros / Amil',
        planClass: 'unimed',
        lastConsult: '20/08/2026',
        lastDoctor: 'Dra. Marina Souza',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Fortalecimento muscular e reeducação postural para alívio de dor cervical.'
    },
    {
        id: 'p10',
        name: 'Thiago Mendes',
        initials: 'TM',
        age: '28 anos',
        gender: 'Masculino',
        cpf: '012.345.678-99',
        phone: '(28) 99088-5544',
        plan: 'Unimed',
        planLabel: 'Unimed VTRM',
        planClass: 'unimed',
        lastConsult: '18/08/2026',
        lastDoctor: 'Dr. Felipe Santos',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Avaliação ortodôntica e clareamento dental. Sem intercorrências.'
    },
    {
        id: 'p11',
        name: 'Beatriz Vasconcelos',
        initials: 'BV',
        age: '33 anos',
        gender: 'Feminino',
        cpf: '135.792.468-01',
        phone: '(28) 98977-4433',
        plan: 'Bradesco',
        planLabel: 'Bradesco Saúde',
        planClass: 'bradesco',
        lastConsult: '15/08/2026',
        lastDoctor: 'Dr. Carlos Eduardo',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Acompanhamento pós-covid para avaliação de capacidade cardiopulmonar.'
    },
    {
        id: 'p12',
        name: 'Eduardo Guimarães',
        initials: 'EG',
        age: '59 anos',
        gender: 'Masculino',
        cpf: '246.801.357-12',
        phone: '(28) 98866-3322',
        plan: 'Particular',
        planLabel: 'Particular',
        planClass: 'particular',
        lastConsult: '10/01/2026',
        lastDoctor: 'Dra. Marina Souza',
        status: 'inativo',
        attendedThisMonth: false,
        notes: 'Tratamento fisioterapêutico de joelho finalizado com sucesso no início do ano.'
    },
    {
        id: 'p13',
        name: 'Helena Carvalho',
        initials: 'HC',
        age: '7 anos',
        gender: 'Feminino',
        cpf: '357.913.579-23',
        phone: '(28) 98755-2211',
        plan: 'Unimed',
        planLabel: 'Unimed VTRM',
        planClass: 'unimed',
        lastConsult: '14/08/2026',
        lastDoctor: 'Dr. Lucas Silveira',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Consulta pediátrica de rotina. Desenvolvimento pôndero-estatural adequado.'
    },
    {
        id: 'p14',
        name: 'Gabriel Fontes',
        initials: 'GF',
        age: '40 anos',
        gender: 'Masculino',
        cpf: '468.024.680-34',
        phone: '(28) 98644-1100',
        plan: 'Amil',
        planLabel: 'Outros / Amil',
        planClass: 'unimed',
        lastConsult: '11/08/2026',
        lastDoctor: 'Dra. Beatriz Lima',
        status: 'ativo',
        attendedThisMonth: true,
        notes: 'Terapia cognitivo-comportamental focada em produtividade e bem-estar.'
    },
    {
        id: 'p15',
        name: 'Larissa Peixoto',
        initials: 'LP',
        age: '22 anos',
        gender: 'Feminino',
        cpf: '579.135.791-45',
        phone: '(28) 98533-0099',
        plan: 'Particular',
        planLabel: 'Particular',
        planClass: 'particular',
        lastConsult: '05/02/2026',
        lastDoctor: 'Dr. Felipe Santos',
        status: 'inativo',
        attendedThisMonth: false,
        notes: 'Remoção de terceiros molares. Alta recebida após cicatrização completa.'
    }
];

const historyData = [
    {
        id: 'h1',
        date: '2026-08-24',
        dateDisplay: '24/08/2026',
        time: '14:00',
        patient: 'Fernanda Lima',
        initials: 'FL',
        avatarBg: '#dbeafe',
        avatarColor: '#2563eb',
        doctor: 'Dr. Carlos Eduardo',
        spec: 'Cardiologia',
        procedure: 'Eletrocardiograma & Consulta',
        status: 'concluido',
        rating: 5.0,
        notes: 'Paciente apresenta ritmo sinusal normal. Exames dentro dos parâmetros normais. Retorno em 1 ano.'
    },
    {
        id: 'h2',
        date: '2026-08-24',
        dateDisplay: '24/08/2026',
        time: '08:00',
        patient: 'João Silva',
        initials: 'JS',
        avatarBg: '#e6f7f2',
        avatarColor: '#008a83',
        doctor: 'Dra. Marina Souza',
        spec: 'Fisioterapia',
        procedure: 'Sessão de Reabilitação Lombar',
        status: 'concluido',
        rating: 5.0,
        notes: 'Quarta sessão realizada. Ganho de amplitude de movimento de 15%. Redução significativa do quadro álgico.'
    },
    {
        id: 'h3',
        date: '2026-08-23',
        dateDisplay: '23/08/2026',
        time: '16:30',
        patient: 'Lucas Ribeiro',
        initials: 'LR',
        avatarBg: '#fef3c7',
        avatarColor: '#d97706',
        doctor: 'Dr. Felipe Santos',
        spec: 'Odontologia',
        procedure: 'Limpeza & Profilaxia',
        status: 'concluido',
        rating: 4.8,
        notes: 'Procedimento realizado sem intercorrências. Aplicação de flúor efetuada.'
    },
    {
        id: 'h4',
        date: '2026-08-23',
        dateDisplay: '23/08/2026',
        time: '11:00',
        patient: 'Mariana Alvares',
        initials: 'MA',
        avatarBg: '#fee2e2',
        avatarColor: '#dc2626',
        doctor: 'Dra. Beatriz Lima',
        spec: 'Psicologia',
        procedure: 'Sessão Individual',
        status: 'cancelado',
        rating: null,
        notes: 'Cancelado com aviso prévio do paciente por imprevisto de trabalho.'
    },
    {
        id: 'h5',
        date: '2026-08-22',
        dateDisplay: '22/08/2026',
        time: '15:00',
        patient: 'Roberto Rocha',
        initials: 'RR',
        avatarBg: '#f1f5f9',
        avatarColor: '#64748b',
        doctor: 'Dr. Carlos Eduardo',
        spec: 'Cardiologia',
        procedure: 'Consulta de Rotina',
        status: 'falta',
        rating: null,
        notes: 'Paciente não compareceu e não justificou ausência. Recepção contatou para reagendamento.'
    },
    {
        id: 'h6',
        date: '2026-08-22',
        dateDisplay: '22/08/2026',
        time: '09:00',
        patient: 'Camila Nogueira',
        initials: 'CN',
        avatarBg: '#e6f7f2',
        avatarColor: '#008a83',
        doctor: 'Dra. Marina Souza',
        spec: 'Fisioterapia',
        procedure: 'RPG & Reeducação Postural',
        status: 'concluido',
        rating: 5.0,
        notes: 'Excelente alinhamento e diminuição de contraturas cervicais.'
    },
    {
        id: 'h7',
        date: '2026-08-21',
        dateDisplay: '21/08/2026',
        time: '14:30',
        patient: 'Thiago Mendes',
        initials: 'TM',
        avatarBg: '#fef3c7',
        avatarColor: '#d97706',
        doctor: 'Dr. Felipe Santos',
        spec: 'Odontologia',
        procedure: 'Avaliação Ortodôntica',
        status: 'concluido',
        rating: 4.9,
        notes: 'Moldagem e planejamento digital de alinhadores estéticos concluído.'
    },
    {
        id: 'h8',
        date: '2026-08-20',
        dateDisplay: '20/08/2026',
        time: '10:30',
        patient: 'Beatriz Vasconcelos',
        initials: 'BV',
        avatarBg: '#dbeafe',
        avatarColor: '#2563eb',
        doctor: 'Dr. Carlos Eduardo',
        spec: 'Cardiologia',
        procedure: 'Ecocardiograma Transtorácico',
        status: 'concluido',
        rating: 5.0,
        notes: 'Fração de ejeção normal (66%). Ausência de refluxos valvares significativos.'
    },
    {
        id: 'h9',
        date: '2026-08-19',
        dateDisplay: '19/08/2026',
        time: '16:00',
        patient: 'Helena Carvalho',
        initials: 'HC',
        avatarBg: '#f3e8ff',
        avatarColor: '#9333ea',
        doctor: 'Dr. Lucas Silveira',
        spec: 'Pediatria',
        procedure: 'Puericultura & Vacinas',
        status: 'concluido',
        rating: 5.0,
        notes: 'Carteira de vacinação atualizada. Peso e altura no percentil 75.'
    },
    {
        id: 'h10',
        date: '2026-08-18',
        dateDisplay: '18/08/2026',
        time: '11:30',
        patient: 'Gabriel Fontes',
        initials: 'GF',
        avatarBg: '#fee2e2',
        avatarColor: '#dc2626',
        doctor: 'Dra. Beatriz Lima',
        spec: 'Psicologia',
        procedure: 'Sessão Individual',
        status: 'concluido',
        rating: 4.9,
        notes: 'Avanço significativo no monitoramento de ansiedade e rotinas de sono.'
    },
    {
        id: 'h11',
        date: '2026-08-17',
        dateDisplay: '17/08/2026',
        time: '08:30',
        patient: 'André Martins',
        initials: 'AM',
        avatarBg: '#e6f7f2',
        avatarColor: '#008a83',
        doctor: 'Dra. Marina Souza',
        spec: 'Fisioterapia',
        procedure: 'Fisioterapia Cinesioterápica',
        status: 'concluido',
        rating: 5.0,
        notes: 'Ganhos progressivos de força em rotadores do manguito.'
    },
    {
        id: 'h12',
        date: '2026-08-16',
        dateDisplay: '16/08/2026',
        time: '15:00',
        patient: 'Patrícia Branco',
        initials: 'PB',
        avatarBg: '#fee2e2',
        avatarColor: '#dc2626',
        doctor: 'Dra. Beatriz Lima',
        spec: 'Psicologia',
        procedure: 'Sessão Semanal',
        status: 'concluido',
        rating: 4.8,
        notes: 'Revisão de metas de bem-estar profissional e equilíbrio pessoal.'
    },
    {
        id: 'h13',
        date: '2026-08-15',
        dateDisplay: '15/08/2026',
        time: '10:00',
        patient: 'Ana Costa',
        initials: 'AC',
        avatarBg: '#fef3c7',
        avatarColor: '#d97706',
        doctor: 'Dr. Felipe Santos',
        spec: 'Odontologia',
        procedure: 'Restauração em Resina',
        status: 'concluido',
        rating: 5.0,
        notes: 'Restauração oclusal perfeita, polimento refinado sem desajuste.'
    },
    {
        id: 'h14',
        date: '2026-08-14',
        dateDisplay: '14/08/2026',
        time: '14:00',
        patient: 'Eduardo Guimarães',
        initials: 'EG',
        avatarBg: '#e6f7f2',
        avatarColor: '#008a83',
        doctor: 'Dra. Marina Souza',
        spec: 'Fisioterapia',
        procedure: 'Reabilitação Funcional',
        status: 'concluido',
        rating: 5.0,
        notes: 'Treinamento proprioceptivo e fortalecimento de membros inferiores.'
    },
    {
        id: 'h15',
        date: '2026-08-12',
        dateDisplay: '12/08/2026',
        time: '09:30',
        patient: 'Lucas Ribeiro',
        initials: 'LR',
        avatarBg: '#dbeafe',
        avatarColor: '#2563eb',
        doctor: 'Dr. Carlos Eduardo',
        spec: 'Cardiologia',
        procedure: 'Holter 24 Horas - Leitura',
        status: 'concluido',
        rating: 4.9,
        notes: 'Sem registro de arritmias ventriculares complexas durante o exame.'
    }
];

const agendaSchedule = {
    '2026-08-24': [
        {
            id: 'ag-1',
            time: '08:00',
            patient: 'João Silva',
            initials: 'JS',
            avatarBg: 'var(--primary-teal-light)',
            avatarColor: 'var(--primary-teal)',
            doctor: 'Dra. Marina Souza',
            spec: 'Fisioterapia',
            type: 'Primeira Consulta',
            status: 'concluido'
        },
        {
            id: 'ag-2',
            time: '09:30',
            patient: 'Ana Costa',
            initials: 'AC',
            avatarBg: '#fef3c7',
            avatarColor: '#d97706',
            doctor: 'Dr. Felipe Santos',
            spec: 'Odontologia',
            type: 'Retorno',
            status: 'aguardando'
        },
        {
            id: 'ag-3',
            time: '10:00',
            patient: 'Patrícia Branco',
            initials: 'PB',
            avatarBg: '#dbeafe',
            avatarColor: '#2563eb',
            doctor: 'Dra. Beatriz Lima',
            spec: 'Psicologia',
            type: 'Sessão Semanal',
            status: 'em-atendimento'
        },
        {
            id: 'ag-4',
            time: '11:30',
            patient: 'André Martins',
            initials: 'AM',
            avatarBg: 'var(--primary-teal-light)',
            avatarColor: 'var(--primary-teal)',
            doctor: 'Dra. Marina Souza',
            spec: 'Fisioterapia',
            type: 'Reavaliação',
            status: 'confirmado'
        },
        {
            id: 'ag-5',
            time: '14:00',
            patient: 'Lucas Ribeiro',
            initials: 'LR',
            avatarBg: '#fef3c7',
            avatarColor: '#d97706',
            doctor: 'Dr. Felipe Santos',
            spec: 'Odontologia',
            type: 'Limpeza & Profilaxia',
            status: 'concluido'
        },
        {
            id: 'ag-6',
            time: '15:30',
            patient: 'Camila Nogueira',
            initials: 'CN',
            avatarBg: 'var(--primary-teal-light)',
            avatarColor: 'var(--primary-teal)',
            doctor: 'Dra. Marina Souza',
            spec: 'Fisioterapia',
            type: 'Sessão Postural',
            status: 'aguardando'
        },
        {
            id: 'ag-7',
            time: '16:30',
            patient: 'Mariana Alvares',
            initials: 'MA',
            avatarBg: '#fee2e2',
            avatarColor: '#dc2626',
            doctor: 'Dra. Beatriz Lima',
            spec: 'Psicologia',
            type: 'Acompanhamento',
            status: 'confirmado'
        },
        {
            id: 'ag-8',
            time: '17:00',
            patient: 'Fernanda Lima',
            initials: 'FL',
            avatarBg: '#dbeafe',
            avatarColor: '#2563eb',
            doctor: 'Dr. Carlos Eduardo',
            spec: 'Cardiologia',
            type: 'Eletrocardiograma',
            status: 'concluido'
        }
    ],
    '2026-08-25': [
        {
            id: 'ag-25-1',
            time: '08:30',
            patient: 'Beatriz Vasconcelos',
            initials: 'BV',
            avatarBg: '#dbeafe',
            avatarColor: '#2563eb',
            doctor: 'Dr. Carlos Eduardo',
            spec: 'Cardiologia',
            type: 'Consulta de Rotina',
            status: 'confirmado'
        },
        {
            id: 'ag-25-2',
            time: '10:00',
            patient: 'Helena Carvalho',
            initials: 'HC',
            avatarBg: '#f3e8ff',
            avatarColor: '#9333ea',
            doctor: 'Dr. Lucas Silveira',
            spec: 'Pediatria',
            type: 'Consulta Pediátrica',
            status: 'confirmado'
        },
        {
            id: 'ag-25-3',
            time: '11:00',
            patient: 'Thiago Mendes',
            initials: 'TM',
            avatarBg: '#fef3c7',
            avatarColor: '#d97706',
            doctor: 'Dr. Felipe Santos',
            spec: 'Odontologia',
            type: 'Manutenção Alinhador',
            status: 'aguardando'
        },
        {
            id: 'ag-25-4',
            time: '14:30',
            patient: 'João Silva',
            initials: 'JS',
            avatarBg: 'var(--primary-teal-light)',
            avatarColor: 'var(--primary-teal)',
            doctor: 'Dra. Marina Souza',
            spec: 'Fisioterapia',
            type: 'Sessão de Fortalecimento',
            status: 'confirmado'
        }
    ],
    '2026-08-23': [
        {
            id: 'ag-23-1',
            time: '08:00',
            patient: 'Lucas Ribeiro',
            initials: 'LR',
            avatarBg: '#fef3c7',
            avatarColor: '#d97706',
            doctor: 'Dr. Felipe Santos',
            spec: 'Odontologia',
            type: 'Limpeza & Profilaxia',
            status: 'concluido'
        },
        {
            id: 'ag-23-2',
            time: '11:00',
            patient: 'Mariana Alvares',
            initials: 'MA',
            avatarBg: '#fee2e2',
            avatarColor: '#dc2626',
            doctor: 'Dra. Beatriz Lima',
            spec: 'Psicologia',
            type: 'Sessão Individual',
            status: 'cancelado'
        },
        {
            id: 'ag-23-3',
            time: '14:00',
            patient: 'André Martins',
            initials: 'AM',
            avatarBg: 'var(--primary-teal-light)',
            avatarColor: 'var(--primary-teal)',
            doctor: 'Dra. Marina Souza',
            spec: 'Fisioterapia',
            type: 'Fisioterapia Ombro',
            status: 'concluido'
        }
    ]
};

const doctorsData = [
    {
        id: 'doc-1',
        name: 'Dra. Marina Souza',
        initials: 'MS',
        reg: 'CREFITO 23451-F',
        spec: 'Fisioterapia',
        specIcon: 'fa-child-reaching',
        phone: '(28) 99811-2233',
        email: 'marina.souza@clinicavitta.com',
        hours: '08:00 - 17:00',
        status: 'ativo',
        todayConsults: 3
    },
    {
        id: 'doc-2',
        name: 'Dr. Felipe Santos',
        initials: 'FS',
        reg: 'CRO-ES 11245',
        spec: 'Odontologia',
        specIcon: 'fa-tooth',
        phone: '(28) 99722-3344',
        email: 'felipe.santos@clinicavitta.com',
        hours: '08:00 - 18:00',
        status: 'ativo',
        todayConsults: 2
    },
    {
        id: 'doc-3',
        name: 'Dra. Beatriz Lima',
        initials: 'BL',
        reg: 'CRP-16 04512',
        spec: 'Psicologia',
        specIcon: 'fa-brain',
        phone: '(28) 99633-4455',
        email: 'beatriz.lima@clinicavitta.com',
        hours: '09:00 - 19:00',
        status: 'ativo',
        todayConsults: 2
    },
    {
        id: 'doc-4',
        name: 'Dr. Carlos Eduardo',
        initials: 'CE',
        reg: 'CRM-ES 8794',
        spec: 'Cardiologia',
        specIcon: 'fa-heart-pulse',
        phone: '(28) 99544-5566',
        email: 'carlos.eduardo@clinicavitta.com',
        hours: '08:00 - 16:00',
        status: 'ativo',
        todayConsults: 1
    },
    {
        id: 'doc-5',
        name: 'Dr. Lucas Silveira',
        initials: 'LS',
        reg: 'CRM-ES 9321',
        spec: 'Pediatria',
        specIcon: 'fa-baby',
        phone: '(28) 99455-6677',
        email: 'lucas.silveira@clinicavitta.com',
        hours: '08:00 - 17:00',
        status: 'ativo',
        todayConsults: 0
    },
    {
        id: 'doc-6',
        name: 'Dra. Renata Martins',
        initials: 'RM',
        reg: 'CRM-ES 6543',
        spec: 'Ortopedia',
        specIcon: 'fa-bone',
        phone: '(28) 99366-7788',
        email: 'renata.martins@clinicavitta.com',
        hours: '08:00 - 17:00',
        status: 'ferias',
        todayConsults: 0
    }
];

// ============================================================
// 2. PAGINATION & FILTER STATE
// ============================================================

let currentTab = 'dashboard';
let selectedAgendaDoctorFilter = 'todos';
let selectedSpecialtyFilter = 'todas';
let currentAgendaDateKey = '2026-08-24';
let currentAgendaView = 'dia';

const patientPagination = {
    currentPage: 1,
    pageSize: 5
};

const historyPagination = {
    currentPage: 1,
    pageSize: 5
};

// Tab Metadata Configurations
const tabConfig = {
    dashboard: {
        category: 'VISÃO GERAL',
        title: 'Olá, equipe Clínica Vitta',
        primaryAction: null,
        secondaryAction: null
    },
    agenda: {
        category: 'AGENDA DE CONSULTAS',
        title: 'Gestão de Agendamentos',
        primaryAction: {
            text: 'Novo Agendamento',
            icon: 'fa-plus',
            onclick: "openModal('modal-agendamento')"
        },
        secondaryAction: {
            text: 'Exportar',
            icon: 'fa-download',
            onclick: "exportSchedule()"
        }
    },
    pacientes: {
        category: 'GESTÃO DE PACIENTES',
        title: 'Base de Pacientes',
        primaryAction: {
            text: 'Novo Paciente',
            icon: 'fa-user-plus',
            onclick: "openPatientModal()"
        },
        secondaryAction: {
            text: 'Exportar Lista',
            icon: 'fa-file-export',
            onclick: "exportPatients()"
        }
    },
    profissionais: {
        category: 'CORPO CLÍNICO',
        title: 'Profissionais de Saúde',
        primaryAction: {
            text: 'Novo Profissional',
            icon: 'fa-user-plus',
            onclick: "openDoctorModal()"
        },
        secondaryAction: {
            text: 'Exportar Lista',
            icon: 'fa-file-export',
            onclick: "exportDoctors()"
        }
    },
    historico: {
        category: 'HISTÓRICO DE ATENDIMENTOS',
        title: 'Registro & Prontuários',
        primaryAction: {
            text: 'Filtro Avançado',
            icon: 'fa-filter',
            onclick: "showToast('Filtro por Período Aplicado!')"
        },
        secondaryAction: {
            text: 'Exportar Relatório',
            icon: 'fa-file-export',
            onclick: "exportHistory()"
        }
    }
};

// ============================================================
// 3. NUMBER ANIMATION HELPER
// ============================================================
function animateValue(elementId, targetValue, suffix = '', prefix = '', duration = 400) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const currentText = el.innerText.replace(/[^0-9.]/g, '');
    const startValue = parseFloat(currentText) || 0;
    const endValue = typeof targetValue === 'number' ? targetValue : (parseFloat(targetValue) || 0);

    if (startValue === endValue) {
        el.innerText = `${prefix}${typeof targetValue === 'string' ? targetValue : targetValue.toLocaleString('pt-BR')}${suffix}`;
        return;
    }

    const startTime = performance.now();
    const isDecimal = !Number.isInteger(endValue);

    function step(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = startValue + (endValue - startValue) * ease;

        if (isDecimal) {
            el.innerText = `${prefix}${current.toFixed(1).replace('.', ',')}${suffix}`;
        } else {
            el.innerText = `${prefix}${Math.round(current).toLocaleString('pt-BR')}${suffix}`;
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            if (isDecimal) {
                el.innerText = `${prefix}${endValue.toFixed(1).replace('.', ',')}${suffix}`;
            } else {
                el.innerText = `${prefix}${endValue.toLocaleString('pt-BR')}${suffix}`;
            }
        }
    }

    requestAnimationFrame(step);
}

// ============================================================
// 4. TAB NAVIGATION SYSTEM
// ============================================================
function switchTab(tabId) {
    if (!tabConfig[tabId]) tabId = 'dashboard';
    currentTab = tabId;

    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
        if (pane.id === `tab-${tabId}`) {
            pane.classList.add('active');
        } else {
            pane.classList.remove('active');
        }
    });

    const config = tabConfig[tabId];
    const catEl = document.getElementById('header-category-tag');
    const titleEl = document.getElementById('header-main-title');
    const actionsContainer = document.getElementById('dynamic-header-actions');

    if (catEl) catEl.innerText = config.category;
    if (titleEl) titleEl.innerText = config.title;

    if (actionsContainer) {
        let actionsHtml = '';
        if (config.secondaryAction) {
            actionsHtml += `
                <button class="btn-secondary" onclick="${config.secondaryAction.onclick}">
                    <i class="fa-solid ${config.secondaryAction.icon}"></i> ${config.secondaryAction.text}
                </button>
            `;
        }
        if (config.primaryAction) {
            actionsHtml += `
                <button class="btn-primary" onclick="${config.primaryAction.onclick}">
                    <i class="fa-solid ${config.primaryAction.icon}"></i> ${config.primaryAction.text}
                </button>
            `;
        }
        actionsContainer.innerHTML = actionsHtml;
    }

    if (window.location.hash !== `#${tabId}`) {
        history.replaceState(null, null, `#${tabId}`);
    }

    // Refresh metrics on switch
    recalculateAllMetrics();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initDashboard() {
    renderPatientsTable();
    renderHistoryTable();
    renderAgendaTimeline();
    recalculateAllMetrics();

    const hash = window.location.hash.replace('#', '');
    if (hash && tabConfig[hash]) {
        switchTab(hash);
    } else {
        switchTab('dashboard');
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && tabConfig[hash]) {
        switchTab(hash);
    }
});

// ============================================================
// 5. TOAST NOTIFICATION SYSTEM
// ============================================================
let toastTimeout;
function showToast(message, iconClass = 'fa-circle-check', isError = false) {
    const toast = document.getElementById('toast-notif');
    const msgEl = document.getElementById('toast-message');
    const iconEl = toast ? toast.querySelector('i') : null;

    if (!toast || !msgEl) return;

    msgEl.innerText = message;
    if (iconEl) {
        iconEl.className = `fa-solid ${iconClass}`;
        iconEl.style.color = isError ? '#ef4444' : '#10b981';
    }

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// ============================================================
// 6. MODALS & DRAWERS MANAGEMENT
// ============================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function closeDrawer(drawerId) {
    const drawer = document.getElementById(drawerId);
    if (drawer) drawer.classList.remove('active');
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ============================================================
// 7. PACIENTES: DYNAMIC PAGINATION, SEARCH, FILTER & CRUD
// ============================================================

function getFilteredPatients() {
    const searchInput = document.getElementById('search-patient');
    const planSelect = document.getElementById('filter-patient-plan');
    const statusSelect = document.getElementById('filter-patient-status');

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const planTerm = planSelect ? planSelect.value : 'todos';
    const statusTerm = statusSelect ? statusSelect.value : 'todos';

    return patientsData.filter(p => {
        const matchesSearch = !searchTerm ||
            p.name.toLowerCase().includes(searchTerm) ||
            p.cpf.includes(searchTerm) ||
            p.phone.includes(searchTerm);

        const matchesPlan = (planTerm === 'todos' || p.plan === planTerm);
        const matchesStatus = (statusTerm === 'todos' || p.status === statusTerm);

        return matchesSearch && matchesPlan && matchesStatus;
    });
}

function renderPatientsTable() {
    const tbody = document.getElementById('patient-table-body');
    const paginationInfo = document.getElementById('patient-pagination-info');
    const paginationControls = document.getElementById('patient-pagination-controls');
    if (!tbody) return;

    const filtered = getFilteredPatients();
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / patientPagination.pageSize));

    if (patientPagination.currentPage > totalPages) {
        patientPagination.currentPage = totalPages;
    }
    if (patientPagination.currentPage < 1) {
        patientPagination.currentPage = 1;
    }

    const startIndex = (patientPagination.currentPage - 1) * patientPagination.pageSize;
    const endIndex = Math.min(startIndex + patientPagination.pageSize, totalItems);
    const currentItems = filtered.slice(startIndex, endIndex);

    if (currentItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table-row">
                    <i class="fa-solid fa-user-slash"></i>
                    Nenhum paciente encontrado com os filtros selecionados.
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = currentItems.map(p => `
            <tr data-id="${p.id}" data-name="${p.name}" data-cpf="${p.cpf}" data-plan="${p.plan}" data-status="${p.status}">
                <td>
                    <div class="patient-cell">
                        <div class="patient-avatar" style="${p.plan === 'Unimed' ? 'background-color: #e0f2fe; color: #0369a1;' : p.plan === 'Bradesco' ? 'background-color: #ffe4e6; color: #be123c;' : ''}">${p.initials}</div>
                        <div class="patient-info">
                            <div class="name">${p.name}</div>
                            <div class="sub">${p.age} • ${p.gender}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="contact-info">
                        <div class="phone">${p.phone}</div>
                        <div class="cpf">${p.cpf}</div>
                    </div>
                </td>
                <td>
                    <span class="health-plan-tag ${p.planClass}">${p.planLabel}</span>
                </td>
                <td>
                    <div style="font-weight: 700; font-size: 13px;">${p.lastConsult}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${p.lastDoctor}</div>
                </td>
                <td>
                    <span class="status-badge ${p.status}">
                        <i class="fa-solid fa-circle" style="font-size: 8px;"></i> ${p.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                </td>
                <td class="actions-cell">
                    <button type="button" class="btn-table-action primary-hover" title="Ver Prontuário" onclick="openPatientDrawerById('${p.id}')">
                        <i class="fa-solid fa-address-card"></i>
                    </button>
                    <button type="button" class="btn-table-action primary-hover" title="Editar Paciente" onclick="editPatientById('${p.id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button type="button" class="btn-table-action ${p.status === 'ativo' ? 'danger-hover' : 'primary-hover'}" title="${p.status === 'ativo' ? 'Inativar Paciente' : 'Reativar Paciente'}" onclick="togglePatientStatusById('${p.id}')">
                        <i class="fa-solid ${p.status === 'ativo' ? 'fa-user-minus' : 'fa-user-check'}"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Update Pagination Text
    if (paginationInfo) {
        if (totalItems === 0) {
            paginationInfo.innerText = 'Exibindo 0 de 0 pacientes';
        } else {
            paginationInfo.innerText = `Exibindo ${startIndex + 1}-${endIndex} de ${totalItems} pacientes`;
        }
    }

    // Update Pagination Controls
    if (paginationControls) {
        let controlsHtml = `
            <button type="button" class="page-btn" ${patientPagination.currentPage <= 1 ? 'disabled' : ''} onclick="prevPatientPage()">
                <i class="fa-solid fa-chevron-left"></i> Anterior
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            controlsHtml += `
                <button type="button" class="page-btn ${i === patientPagination.currentPage ? 'active' : ''}" onclick="goToPatientPage(${i})">
                    ${i}
                </button>
            `;
        }

        controlsHtml += `
            <button type="button" class="page-btn" ${patientPagination.currentPage >= totalPages ? 'disabled' : ''} onclick="nextPatientPage()">
                Próximo <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        paginationControls.innerHTML = controlsHtml;
    }

    updatePatientStats();
}

function goToPatientPage(page) {
    patientPagination.currentPage = page;
    renderPatientsTable();
}

function prevPatientPage() {
    if (patientPagination.currentPage > 1) {
        patientPagination.currentPage--;
        renderPatientsTable();
    }
}

function nextPatientPage() {
    const totalFiltered = getFilteredPatients().length;
    const totalPages = Math.ceil(totalFiltered / patientPagination.pageSize);
    if (patientPagination.currentPage < totalPages) {
        patientPagination.currentPage++;
        renderPatientsTable();
    }
}

function filterPatients() {
    patientPagination.currentPage = 1;
    renderPatientsTable();
}

function openPatientDrawerById(id) {
    const patient = patientsData.find(p => p.id === id);
    if (!patient) return;

    openPatientDrawer(
        patient.name,
        patient.initials,
        patient.age,
        patient.phone,
        patient.cpf,
        patient.planLabel,
        `${patient.lastConsult} com ${patient.lastDoctor}`,
        patient.notes
    );
}

function openPatientDrawer(name, initials, age, phone, cpf, plan, lastConsult, notes = 'Sem observações adicionais.') {
    document.getElementById('d-patient-name').innerText = name;
    document.getElementById('d-patient-avatar').innerText = initials;
    document.getElementById('d-patient-meta').innerText = `${age} • CPF: ${cpf}`;
    document.getElementById('d-patient-phone').innerText = phone;
    document.getElementById('d-patient-plan').innerText = plan;
    document.getElementById('d-patient-last').innerText = lastConsult;

    const drawer = document.getElementById('drawer-prontuario');
    if (drawer) drawer.classList.add('active');
}

let editingPatientId = null;

function openPatientModal() {
    editingPatientId = null;
    document.getElementById('modal-patient-title').innerText = 'Cadastrar Novo Paciente';
    document.getElementById('form-paciente').reset();
    openModal('modal-paciente');
}

function closePatientModal() {
    closeModal('modal-paciente');
    editingPatientId = null;
}

function editPatientById(id) {
    const patient = patientsData.find(p => p.id === id);
    if (!patient) return;

    editingPatientId = id;
    document.getElementById('modal-patient-title').innerText = 'Editar Dados do Paciente';
    document.getElementById('p-nome').value = patient.name;
    document.getElementById('p-cpf').value = patient.cpf;
    document.getElementById('p-tel').value = patient.phone;
    document.getElementById('p-plan').value = patient.plan;
    document.getElementById('p-genero').value = patient.gender;
    if (document.getElementById('p-obs')) document.getElementById('p-obs').value = patient.notes || '';

    openModal('modal-paciente');
}

function togglePatientStatusById(id) {
    const patient = patientsData.find(p => p.id === id);
    if (!patient) return;

    if (patient.status === 'ativo') {
        patient.status = 'inativo';
        showToast(`Paciente ${patient.name} marcado como inativo.`, 'fa-user-slash', true);
    } else {
        patient.status = 'ativo';
        showToast(`Paciente ${patient.name} reativado com sucesso!`);
    }

    renderPatientsTable();
    recalculateAllMetrics();
}

function savePatient(e) {
    e.preventDefault();
    const name = document.getElementById('p-nome').value.trim();
    const cpf = document.getElementById('p-cpf').value.trim();
    const phone = document.getElementById('p-tel').value.trim();
    const plan = document.getElementById('p-plan').value;
    const gender = document.getElementById('p-genero').value;
    const obs = document.getElementById('p-obs') ? document.getElementById('p-obs').value.trim() : 'Novo cadastro.';

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    let planLabel = plan;
    let planClass = 'particular';
    if (plan === 'Unimed') { planLabel = 'Unimed VTRM'; planClass = 'unimed'; }
    if (plan === 'Bradesco') { planLabel = 'Bradesco Saúde'; planClass = 'bradesco'; }
    if (plan === 'Amil') { planLabel = 'Outros / Amil'; planClass = 'unimed'; }

    if (editingPatientId) {
        const patient = patientsData.find(p => p.id === editingPatientId);
        if (patient) {
            patient.name = name;
            patient.initials = initials;
            patient.cpf = cpf;
            patient.phone = phone;
            patient.plan = plan;
            patient.planLabel = planLabel;
            patient.planClass = planClass;
            patient.gender = gender;
            patient.notes = obs;
            showToast('Dados do paciente atualizados com sucesso!');
        }
    } else {
        const newPatient = {
            id: 'p-' + Date.now(),
            name: name,
            initials: initials,
            age: 'Novo',
            gender: gender,
            cpf: cpf,
            phone: phone,
            plan: plan,
            planLabel: planLabel,
            planClass: planClass,
            lastConsult: 'Sem consulta',
            lastDoctor: '-',
            status: 'ativo',
            attendedThisMonth: true,
            notes: obs
        };
        patientsData.unshift(newPatient);
        patientPagination.currentPage = 1;
        showToast('Novo paciente cadastrado com sucesso!');
    }

    closePatientModal();
    renderPatientsTable();
    recalculateAllMetrics();
}

function updatePatientStats() {
    const total = patientsData.length;
    const active = patientsData.filter(p => p.status === 'ativo').length;
    const inactive = total - active;
    const activePercent = total > 0 ? Math.round((active / total) * 100) : 0;
    const attendedMonth = patientsData.filter(p => p.attendedThisMonth).length;

    animateValue('stat-total-patients', total);
    animateValue('stat-active-patients', active);
    animateValue('stat-attended-month-patients', attendedMonth);
    animateValue('stat-inactive-patients', inactive);

    const activeSub = document.getElementById('stat-active-patients-sub');
    if (activeSub) activeSub.innerText = `${activePercent}% da base total`;

    // Dynamic Convenios Distribution Panel
    const unimedCount = patientsData.filter(p => p.plan === 'Unimed').length;
    const particularCount = patientsData.filter(p => p.plan === 'Particular').length;
    const bradescoCount = patientsData.filter(p => p.plan === 'Bradesco').length;
    const amilCount = patientsData.filter(p => p.plan === 'Amil').length;

    const planList = document.getElementById('patient-plan-summary-list');
    if (planList) {
        planList.innerHTML = `
            <div class="plan-item">
                <div class="plan-info">
                    <div class="plan-dot" style="background-color: #0369a1;"></div>
                    <span class="plan-name">Unimed</span>
                </div>
                <span class="plan-count">${unimedCount} pacientes</span>
            </div>
            <div class="plan-item">
                <div class="plan-info">
                    <div class="plan-dot" style="background-color: #b45309;"></div>
                    <span class="plan-name">Particular</span>
                </div>
                <span class="plan-count">${particularCount} pacientes</span>
            </div>
            <div class="plan-item">
                <div class="plan-info">
                    <div class="plan-dot" style="background-color: #be123c;"></div>
                    <span class="plan-name">Bradesco Saúde</span>
                </div>
                <span class="plan-count">${bradescoCount} pacientes</span>
            </div>
            <div class="plan-item">
                <div class="plan-info">
                    <div class="plan-dot" style="background-color: #059669;"></div>
                    <span class="plan-name">Outros / Amil</span>
                </div>
                <span class="plan-count">${amilCount} pacientes</span>
            </div>
        `;
    }
}

function exportPatients() {
    showToast('Lista de pacientes exportada em XLS com sucesso!');
}

// ============================================================
// 8. HISTÓRICO: DYNAMIC PAGINATION, SEARCH, FILTER & STATS
// ============================================================

function getFilteredHistory() {
    const searchInput = document.getElementById('search-history');
    const doctorSelect = document.getElementById('filter-history-doctor');
    const statusSelect = document.getElementById('filter-history-status');

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const doctorTerm = doctorSelect ? doctorSelect.value : 'todos';
    const statusTerm = statusSelect ? statusSelect.value : 'todos';

    return historyData.filter(h => {
        const matchesSearch = !searchTerm ||
            h.patient.toLowerCase().includes(searchTerm) ||
            h.doctor.toLowerCase().includes(searchTerm) ||
            h.procedure.toLowerCase().includes(searchTerm);

        const matchesDoctor = (doctorTerm === 'todos' || h.doctor === doctorTerm);
        const matchesStatus = (statusTerm === 'todos' || h.status === statusTerm);

        return matchesSearch && matchesDoctor && matchesStatus;
    });
}

function renderHistoryTable() {
    const tbody = document.getElementById('history-table-body');
    const paginationInfo = document.getElementById('history-pagination-info');
    const paginationControls = document.getElementById('history-pagination-controls');
    if (!tbody) return;

    const filtered = getFilteredHistory();
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / historyPagination.pageSize));

    if (historyPagination.currentPage > totalPages) {
        historyPagination.currentPage = totalPages;
    }
    if (historyPagination.currentPage < 1) {
        historyPagination.currentPage = 1;
    }

    const startIndex = (historyPagination.currentPage - 1) * historyPagination.pageSize;
    const endIndex = Math.min(startIndex + historyPagination.pageSize, totalItems);
    const currentItems = filtered.slice(startIndex, endIndex);

    if (currentItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table-row">
                    <i class="fa-solid fa-calendar-xmark"></i>
                    Nenhum registro histórico encontrado para os filtros informados.
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = currentItems.map(h => {
            let statusBadge = `<span class="status-badge concluido"><i class="fa-solid fa-circle-check"></i> Concluído</span>`;
            if (h.status === 'cancelado') statusBadge = `<span class="status-badge cancelado"><i class="fa-solid fa-ban"></i> Cancelado</span>`;
            if (h.status === 'falta') statusBadge = `<span class="status-badge falta"><i class="fa-solid fa-user-xmark"></i> Ausente</span>`;

            return `
                <tr data-id="${h.id}" data-patient="${h.patient}" data-doctor="${h.doctor}" data-status="${h.status}">
                    <td>
                        <div style="font-weight: 700;">${h.dateDisplay}</div>
                        <div style="font-size: 11px; color: var(--text-muted);">${h.time}</div>
                    </td>
                    <td>
                        <div class="patient-cell">
                            <div class="patient-avatar" style="background-color: ${h.avatarBg}; color: ${h.avatarColor};">${h.initials}</div>
                            <div style="font-weight: 700;">${h.patient}</div>
                        </div>
                    </td>
                    <td>
                        <div class="doctor-cell">
                            <span class="doctor-name">${h.doctor}</span>
                            <span class="doctor-spec">${h.spec}</span>
                        </div>
                    </td>
                    <td>
                        <span style="font-weight: 600;">${h.procedure}</span>
                    </td>
                    <td>
                        ${statusBadge}
                    </td>
                    <td>
                        <button type="button" class="btn-table-action" style="width: auto; padding: 6px 12px; gap: 6px;" onclick="openHistoryDrawerById('${h.id}')">
                            <i class="fa-solid fa-file-lines"></i> ${h.status === 'concluido' ? 'Ver Prontuário' : 'Ver Detalhes'}
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Update Pagination Text
    if (paginationInfo) {
        if (totalItems === 0) {
            paginationInfo.innerText = 'Exibindo 0 de 0 registros';
        } else {
            paginationInfo.innerText = `Exibindo ${startIndex + 1}-${endIndex} de ${totalItems} registros`;
        }
    }

    // Update Pagination Controls
    if (paginationControls) {
        let controlsHtml = `
            <button type="button" class="page-btn" ${historyPagination.currentPage <= 1 ? 'disabled' : ''} onclick="prevHistoryPage()">
                <i class="fa-solid fa-chevron-left"></i> Anterior
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            controlsHtml += `
                <button type="button" class="page-btn ${i === historyPagination.currentPage ? 'active' : ''}" onclick="goToHistoryPage(${i})">
                    ${i}
                </button>
            `;
        }

        controlsHtml += `
            <button type="button" class="page-btn" ${historyPagination.currentPage >= totalPages ? 'disabled' : ''} onclick="nextHistoryPage()">
                Próximo <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        paginationControls.innerHTML = controlsHtml;
    }

    updateHistoryStats();
}

function goToHistoryPage(page) {
    historyPagination.currentPage = page;
    renderHistoryTable();
}

function prevHistoryPage() {
    if (historyPagination.currentPage > 1) {
        historyPagination.currentPage--;
        renderHistoryTable();
    }
}

function nextHistoryPage() {
    const totalFiltered = getFilteredHistory().length;
    const totalPages = Math.ceil(totalFiltered / historyPagination.pageSize);
    if (historyPagination.currentPage < totalPages) {
        historyPagination.currentPage++;
        renderHistoryTable();
    }
}

function filterHistory() {
    historyPagination.currentPage = 1;
    renderHistoryTable();
}

function openHistoryDrawerById(id) {
    const h = historyData.find(item => item.id === id);
    if (!h) return;

    openHistoryDrawer(
        h.patient,
        h.doctor,
        h.spec,
        `${h.dateDisplay} - ${h.time}`,
        h.procedure,
        h.notes
    );
}

function openHistoryDrawer(patient, doctor, spec, datetime, procedure, notes) {
    document.getElementById('h-patient').innerText = patient;
    document.getElementById('h-doctor').innerText = doctor;
    document.getElementById('h-spec').innerText = spec;
    document.getElementById('h-datetime').innerText = datetime;
    document.getElementById('h-proc').innerText = procedure;
    document.getElementById('h-notes').innerText = notes;

    const drawer = document.getElementById('drawer-historico');
    if (drawer) drawer.classList.add('active');
}

function updateHistoryStats() {
    const completed = historyData.filter(h => h.status === 'concluido').length;
    const absences = historyData.filter(h => h.status === 'falta').length;
    const totalAttempted = completed + absences;
    const presenceRate = totalAttempted > 0 ? ((completed / totalAttempted) * 100).toFixed(1) : '100.0';

    animateValue('stat-total-history', completed + 1235); // Reflecting global clinic scale
    const presenceEl = document.getElementById('stat-presence-rate');
    if (presenceEl) presenceEl.innerText = `${presenceRate}%`;
    animateValue('stat-attended-month-history', historyData.length + 169);

    // Specialty breakdown percentages calculation
    const specCounts = {
        'Fisioterapia': 0,
        'Odontologia': 0,
        'Psicologia': 0,
        'Cardiologia': 0,
        'Pediatria': 0
    };

    historyData.forEach(h => {
        if (specCounts[h.spec] !== undefined) {
            specCounts[h.spec]++;
        }
    });

    const totalSpecs = Object.values(specCounts).reduce((a, b) => a + b, 0) || 1;
    const specPercentages = {
        'Fisioterapia': Math.round((specCounts['Fisioterapia'] / totalSpecs) * 100),
        'Odontologia': Math.round((specCounts['Odontologia'] / totalSpecs) * 100),
        'Psicologia': Math.round((specCounts['Psicologia'] / totalSpecs) * 100),
        'Cardiologia': Math.round((specCounts['Cardiologia'] / totalSpecs) * 100),
        'Pediatria': Math.max(4, 100 - (
            Math.round((specCounts['Fisioterapia'] / totalSpecs) * 100) +
            Math.round((specCounts['Odontologia'] / totalSpecs) * 100) +
            Math.round((specCounts['Psicologia'] / totalSpecs) * 100) +
            Math.round((specCounts['Cardiologia'] / totalSpecs) * 100)
        ))
    };

    const specBarList = document.getElementById('history-spec-bar-list');
    if (specBarList) {
        specBarList.innerHTML = `
            <div class="stat-bar-item">
                <div class="stat-bar-header">
                    <span>Fisioterapia</span>
                    <span class="spec-percent">${specPercentages['Fisioterapia']}%</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${specPercentages['Fisioterapia']}%;"></div>
                </div>
            </div>

            <div class="stat-bar-item">
                <div class="stat-bar-header">
                    <span>Odontologia</span>
                    <span class="spec-percent">${specPercentages['Odontologia']}%</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${specPercentages['Odontologia']}%;"></div>
                </div>
            </div>

            <div class="stat-bar-item">
                <div class="stat-bar-header">
                    <span>Psicologia</span>
                    <span class="spec-percent">${specPercentages['Psicologia']}%</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${specPercentages['Psicologia']}%;"></div>
                </div>
            </div>

            <div class="stat-bar-item">
                <div class="stat-bar-header">
                    <span>Cardiologia</span>
                    <span class="spec-percent">${specPercentages['Cardiologia']}%</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${specPercentages['Cardiologia']}%;"></div>
                </div>
            </div>

            <div class="stat-bar-item">
                <div class="stat-bar-header">
                    <span>Pediatria</span>
                    <span class="spec-percent">${specPercentages['Pediatria']}%</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${specPercentages['Pediatria']}%;"></div>
                </div>
            </div>
        `;
    }
}

function exportHistory() {
    showToast('Relatório de histórico exportado em PDF/XLS com sucesso!');
}

// ============================================================
// 9. AGENDA: DATE NAVIGATION, STATUS MANAGEMENT & TIMELINE
// ============================================================

function formatDatePTBR(dateStr) {
    const [year, month, day] = dateStr.split('-');
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const monthName = months[parseInt(month, 10) - 1];
    const isToday = (dateStr === '2026-08-24');
    return `${parseInt(day, 10)} de ${monthName}, ${year}${isToday ? ' (Hoje)' : ''}`;
}

function changeDate(delta) {
    const parts = currentAgendaDateKey.split('-');
    const dt = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    dt.setDate(dt.getDate() + delta);

    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    currentAgendaDateKey = `${y}-${m}-${d}`;

    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
        dateDisplay.innerText = formatDatePTBR(currentAgendaDateKey);
    }

    renderAgendaTimeline();
    recalculateAllMetrics();
    showToast(`Agenda de ${d}/${m}/${y} carregada!`);
}

function setAgendaView(view, btn) {
    currentAgendaView = view;
    document.querySelectorAll('.view-toggler .view-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    showToast(`Visualização por ${view.toUpperCase()} selecionada.`);
}

function getTodayAppointments() {
    if (!agendaSchedule[currentAgendaDateKey]) {
        agendaSchedule[currentAgendaDateKey] = [
            {
                id: `ag-auto-${Date.now()}-1`,
                time: '09:00',
                patient: 'Consulta Agendada',
                initials: 'CA',
                avatarBg: 'var(--primary-teal-light)',
                avatarColor: 'var(--primary-teal)',
                doctor: 'Dra. Marina Souza',
                spec: 'Fisioterapia',
                type: 'Atendimento',
                status: 'confirmado'
            }
        ];
    }
    return agendaSchedule[currentAgendaDateKey];
}

function renderAgendaTimeline() {
    const list = document.getElementById('appointment-list');
    if (!list) return;

    const appointments = getTodayAppointments();
    const searchInput = document.getElementById('search-agenda-input');
    const statusSelect = document.getElementById('agenda-status-filter');

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const statusTerm = statusSelect ? statusSelect.value : 'todos';

    const filtered = appointments.filter(a => {
        const matchesSearch = !searchTerm ||
            a.patient.toLowerCase().includes(searchTerm) ||
            a.doctor.toLowerCase().includes(searchTerm) ||
            a.spec.toLowerCase().includes(searchTerm);

        const matchesStatus = (statusTerm === 'todos' || a.status === statusTerm);
        const matchesDoctor = (selectedAgendaDoctorFilter === 'todos' || a.doctor === selectedAgendaDoctorFilter);

        return matchesSearch && matchesStatus && matchesDoctor;
    });

    if (filtered.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-muted); font-weight: 600;">
                <i class="fa-solid fa-calendar-xmark" style="font-size: 32px; color: var(--text-light); margin-bottom: 10px; display: block;"></i>
                Nenhum compromisso agendado para esta data ou filtro.
            </div>
        `;
    } else {
        list.innerHTML = filtered.map(a => {
            let cardClass = 'appointment-card status-confirmed';
            let badgeHtml = `<span class="status-badge confirmado"><i class="fa-solid fa-circle-check"></i> Confirmado</span>`;
            let actionsHtml = `
                <button type="button" class="btn-action btn-start" onclick="updateAppointmentStatus('${a.id}', 'em-atendimento')">
                    <i class="fa-solid fa-play"></i> Iniciar
                </button>
                <button type="button" class="btn-action btn-cancel" onclick="updateAppointmentStatus('${a.id}', 'cancelado')" title="Cancelar">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;

            if (a.status === 'aguardando') {
                cardClass = 'appointment-card status-waiting';
                badgeHtml = `<span class="status-badge aguardando"><i class="fa-solid fa-clock"></i> Aguardando</span>`;
            } else if (a.status === 'em-atendimento') {
                cardClass = 'appointment-card status-ongoing';
                badgeHtml = `<span class="status-badge em-atendimento"><i class="fa-solid fa-spinner fa-spin"></i> Em Atendimento</span>`;
                actionsHtml = `
                    <button type="button" class="btn-action btn-complete" onclick="updateAppointmentStatus('${a.id}', 'concluido')">
                        <i class="fa-solid fa-check"></i> Concluir
                    </button>
                `;
            } else if (a.status === 'concluido') {
                cardClass = 'appointment-card status-completed';
                badgeHtml = `<span class="status-badge concluido"><i class="fa-solid fa-check-double"></i> Concluído</span>`;
                actionsHtml = `
                    <button type="button" class="btn-icon-only" title="Ver Prontuário" onclick="switchTab('historico')">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                `;
            } else if (a.status === 'cancelado') {
                cardClass = 'appointment-card status-canceled';
                badgeHtml = `<span class="status-badge cancelado"><i class="fa-solid fa-ban"></i> Cancelado</span>`;
                actionsHtml = '';
            }

            return `
                <div class="timeline-slot" data-id="${a.id}" data-status="${a.status}" data-doctor="${a.doctor}" data-name="${a.patient}">
                    <div class="time-label">${a.time}</div>
                    <div class="${cardClass}">
                        <div class="patient-details">
                            <div class="patient-avatar" style="background-color: ${a.avatarBg || 'var(--primary-teal-light)'}; color: ${a.avatarColor || 'var(--primary-teal)'};">${a.initials}</div>
                            <div class="patient-info">
                                <div class="name">${a.patient}</div>
                                <div class="meta">
                                    <span>${a.spec}</span>
                                    <span class="meta-dot"></span>
                                    <span>${a.doctor}</span>
                                    <span class="meta-dot"></span>
                                    <span>${a.type}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-right-side">
                            ${badgeHtml}
                            <div class="action-btns">
                                ${actionsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function updateAppointmentStatus(id, newStatus) {
    const appointments = getTodayAppointments();
    const item = appointments.find(a => a.id === id);
    if (!item) return;

    item.status = newStatus;

    if (newStatus === 'em-atendimento') {
        showToast(`Atendimento de ${item.patient} iniciado!`);
    } else if (newStatus === 'concluido') {
        showToast(`Atendimento de ${item.patient} concluído com sucesso!`);
        // Record in history if concluded
        historyData.unshift({
            id: 'h-' + Date.now(),
            date: currentAgendaDateKey,
            dateDisplay: currentAgendaDateKey.split('-').reverse().join('/'),
            time: item.time,
            patient: item.patient,
            initials: item.initials,
            avatarBg: item.avatarBg,
            avatarColor: item.avatarColor,
            doctor: item.doctor,
            spec: item.spec,
            procedure: item.type,
            status: 'concluido',
            rating: 5.0,
            notes: `Atendimento realizado com sucesso no dia ${currentAgendaDateKey}.`
        });
        renderHistoryTable();
    } else if (newStatus === 'cancelado') {
        showToast(`Consulta de ${item.patient} cancelada.`, 'fa-circle-exclamation', true);
    }

    renderAgendaTimeline();
    recalculateAllMetrics();
}

function filterAppointments() {
    renderAgendaTimeline();
}

function filterAgendaDoctor(doctorName, element) {
    selectedAgendaDoctorFilter = doctorName;
    document.querySelectorAll('.doctor-item').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    renderAgendaTimeline();
}

function saveAppointment(e) {
    e.preventDefault();
    const name = document.getElementById('input-paciente').value.trim();
    const doctor = document.getElementById('input-medico').value;
    const spec = document.getElementById('input-especialidade').value.trim();
    const date = document.getElementById('input-data').value;
    const time = document.getElementById('input-horario').value;
    const obs = document.getElementById('input-obs') ? document.getElementById('input-obs').value.trim() : 'Consulta';

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    if (!agendaSchedule[date]) {
        agendaSchedule[date] = [];
    }

    const newAppointment = {
        id: 'ag-' + Date.now(),
        time: time,
        patient: name,
        initials: initials,
        avatarBg: 'var(--primary-teal-light)',
        avatarColor: 'var(--primary-teal)',
        doctor: doctor,
        spec: spec,
        type: obs || 'Consulta',
        status: 'confirmado'
    };

    agendaSchedule[date].push(newAppointment);
    agendaSchedule[date].sort((a, b) => a.time.localeCompare(b.time));

    closeModal('modal-agendamento');
    document.getElementById('form-novo-agendamento').reset();

    showToast('Novo agendamento registrado com sucesso!');

    if (date === currentAgendaDateKey) {
        renderAgendaTimeline();
    }
    recalculateAllMetrics();
}

function exportSchedule() {
    showToast('Relatório da agenda exportado em PDF com sucesso!');
}

// ============================================================
// 10. RECALCULATE ALL METRICS (DASHBOARD & WIDGETS REACTION)
// ============================================================

function recalculateAllMetrics() {
    const todayAppointments = getTodayAppointments();
    const totalToday = todayAppointments.length;
    let waitingToday = 0;
    let ongoingToday = 0;
    let completedToday = 0;

    todayAppointments.forEach(a => {
        if (a.status === 'aguardando') waitingToday++;
        if (a.status === 'em-atendimento') ongoingToday++;
        if (a.status === 'concluido') completedToday++;
    });

    const completionPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

    // 1. Dashboard Tab Top Cards
    animateValue('stat-dash-today', totalToday);
    const dashTodaySub = document.getElementById('stat-dash-today-sub');
    if (dashTodaySub) dashTodaySub.innerText = `${waitingToday} aguardando confirmação`;

    animateValue('stat-dash-patients', patientsData.length + 141);
    animateValue('stat-dash-doctors', doctorsData.filter(d => d.status === 'ativo').length);
    animateValue('stat-dash-completed', completedToday);
    const dashCompSub = document.getElementById('stat-dash-completed-sub');
    if (dashCompSub) dashCompSub.innerText = `${completionPercent}% da agenda do dia`;

    // 2. Dashboard Tab: Progress Gauge (Foco do Dia)
    const meterEl = document.getElementById('dash-progress-meter');
    const textEl = document.getElementById('dash-progress-text');
    const countEl = document.getElementById('dash-progress-count');
    const alertEl = document.getElementById('dash-progress-alert-text');

    if (meterEl) {
        // SVG circle radius is 24, circumference is 2 * Math.PI * 24 ≈ 150.8
        const circumference = 150.8;
        const offset = circumference - (circumference * (completionPercent / 100));
        meterEl.style.strokeDasharray = `${circumference}`;
        meterEl.style.strokeDashoffset = `${offset}`;
    }

    if (textEl) textEl.innerText = `${completionPercent}%`;
    if (countEl) countEl.innerText = `${completedToday} de ${totalToday}`;

    if (alertEl) {
        if (waitingToday > 0) {
            alertEl.innerText = `${waitingToday} ${waitingToday === 1 ? 'consulta ainda aguarda' : 'consultas ainda aguardam'} confirmação dos pacientes.`;
        } else if (ongoingToday > 0) {
            alertEl.innerText = `${ongoingToday} ${ongoingToday === 1 ? 'atendimento em andamento' : 'atendimentos em andamento'} no momento.`;
        } else if (completedToday === totalToday && totalToday > 0) {
            alertEl.innerText = 'Parabéns! Todos os atendimentos de hoje foram concluídos com sucesso.';
        } else {
            alertEl.innerText = 'Agenda do dia organizada e pronta para atendimentos.';
        }
    }

    // 3. Dashboard Tab: Next Appointments List
    const previewList = document.getElementById('dashboard-preview-list');
    if (previewList) {
        const previewItems = todayAppointments.slice(0, 4);
        if (previewItems.length === 0) {
            previewList.innerHTML = `<li style="padding: 16px; color: var(--text-muted); text-align: center;">Nenhum agendamento para hoje.</li>`;
        } else {
            previewList.innerHTML = previewItems.map(a => {
                let badge = `<span class="status-badge confirmado"><i class="fa-solid fa-circle-check"></i> Confirmado</span>`;
                if (a.status === 'aguardando') badge = `<span class="status-badge aguardando"><i class="fa-solid fa-clock"></i> Aguardando</span>`;
                if (a.status === 'em-atendimento') badge = `<span class="status-badge em-atendimento"><i class="fa-solid fa-spinner fa-spin"></i> Em Atendimento</span>`;
                if (a.status === 'concluido') badge = `<span class="status-badge concluido"><i class="fa-solid fa-check-double"></i> Concluído</span>`;
                if (a.status === 'cancelado') badge = `<span class="status-badge cancelado"><i class="fa-solid fa-ban"></i> Cancelado</span>`;

                return `
                    <li class="appointment-preview-item">
                        <div class="preview-left">
                            <span class="preview-time">${a.time}</span>
                            <div class="preview-info">
                                <strong>${a.patient}</strong>
                                <span>${a.spec} • ${a.doctor}</span>
                            </div>
                        </div>
                        ${badge}
                    </li>
                `;
            }).join('');
        }
    }

    // 4. Agenda Tab Top Cards
    animateValue('stat-total-agenda', totalToday);
    animateValue('stat-waiting-agenda', waitingToday);
    animateValue('stat-ongoing-agenda', ongoingToday);
    animateValue('stat-completed-agenda', completedToday);
    const agendaCompSub = document.getElementById('stat-completed-agenda-sub');
    if (agendaCompSub) agendaCompSub.innerText = `${completionPercent}% da agenda do dia`;

    // 5. Update Doctors and History metrics
    updateDoctorCounters();
    updateHistoryStats();
    updatePatientStats();
}

// ============================================================
// 11. PROFISSIONAIS (CORPO CLÍNICO) TAB FUNCTIONS
// ============================================================

function openDoctorModal() {
    document.getElementById('modal-doctor-title').innerText = 'Cadastrar Novo Profissional';
    document.getElementById('form-profissional').reset();
    openModal('modal-profissional');
}

function closeDoctorModal() {
    closeModal('modal-profissional');
}

function saveDoctor(e) {
    e.preventDefault();
    const name = document.getElementById('doc-nome').value.trim();
    const reg = document.getElementById('doc-reg').value.trim();
    const spec = document.getElementById('doc-spec').value;
    const status = document.getElementById('doc-status').value;
    const phone = document.getElementById('doc-tel').value.trim();
    const email = document.getElementById('doc-email') ? document.getElementById('doc-email').value.trim() : 'medico@clinicavitta.com';
    const hours = document.getElementById('doc-horario') ? document.getElementById('doc-horario').value.trim() : '08:00 - 17:00';

    const initials = name.replace('Dr. ', '').replace('Dra. ', '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    let iconClass = 'fa-user-doctor';
    if (spec === 'Fisioterapia') iconClass = 'fa-child-reaching';
    if (spec === 'Odontologia') iconClass = 'fa-tooth';
    if (spec === 'Psicologia') iconClass = 'fa-brain';
    if (spec === 'Cardiologia') iconClass = 'fa-heart-pulse';
    if (spec === 'Pediatria') iconClass = 'fa-baby';
    if (spec === 'Ortopedia') iconClass = 'fa-bone';

    const newDoc = {
        id: 'doc-' + Date.now(),
        name: name,
        initials: initials,
        reg: reg,
        spec: spec,
        specIcon: iconClass,
        phone: phone,
        email: email,
        hours: hours,
        status: status,
        todayConsults: 0
    };

    doctorsData.unshift(newDoc);
    renderDoctorsGrid();
    closeDoctorModal();
    showToast('Profissional cadastrado com sucesso!');
    recalculateAllMetrics();
}

function renderDoctorsGrid() {
    const grid = document.getElementById('doctors-grid-container');
    if (!grid) return;

    const searchInput = document.getElementById('search-doctor');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = doctorsData.filter(d => {
        const matchesSearch = !searchTerm ||
            d.name.toLowerCase().includes(searchTerm) ||
            d.reg.toLowerCase().includes(searchTerm) ||
            d.spec.toLowerCase().includes(searchTerm);

        const matchesSpec = (selectedSpecialtyFilter === 'todas' || d.spec === selectedSpecialtyFilter);
        return matchesSearch && matchesSpec;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-user-doctor" style="font-size: 32px; color: var(--text-light); margin-bottom: 10px; display: block;"></i>
                Nenhum profissional encontrado com os filtros selecionados.
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(d => {
        const statusBadge = d.status === 'ativo'
            ? '<span class="status-badge ativo"><i class="fa-solid fa-circle" style="font-size: 7px;"></i> Ativo</span>'
            : '<span class="status-badge ferias"><i class="fa-solid fa-plane" style="font-size: 7px;"></i> Férias</span>';

        return `
            <div class="doctor-card" data-id="${d.id}" data-name="${d.name}" data-reg="${d.reg}" data-spec="${d.spec}" data-status="${d.status}">
                <div class="doc-header-row">
                    <div class="doc-avatar-box">${d.initials}</div>
                    <div class="doc-main-info">
                        <h3>${d.name}</h3>
                        <div class="registration">${d.reg}</div>
                        <span class="specialty-badge">
                            <i class="fa-solid ${d.specIcon}"></i> ${d.spec}
                        </span>
                    </div>
                </div>

                <div class="doc-details-list">
                    <div class="doc-detail-item">
                        <span>Consultas Hoje:</span>
                        <strong>${d.todayConsults} agendadas</strong>
                    </div>
                    <div class="doc-detail-item">
                        <span>Horário:</span>
                        <strong>${d.hours}</strong>
                    </div>
                    <div class="doc-detail-item">
                        <span>Status:</span>
                        ${statusBadge}
                    </div>
                </div>

                <div class="card-actions">
                    <button class="btn-card-primary" onclick="openDoctorDrawer('${d.name}', '${d.initials}', '${d.reg}', '${d.spec}', '${d.phone}', '${d.todayConsults} consultas hoje')">
                        <i class="fa-solid fa-calendar-check"></i> Ver Agenda
                    </button>
                    <button class="btn-card-icon" title="Editar Profissional" onclick="editDoctorById('${d.id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-card-icon ${d.status === 'ativo' ? 'danger' : ''}" title="${d.status === 'ativo' ? 'Marcar Férias' : 'Reativar'}" onclick="toggleDoctorStatusById('${d.id}')">
                        <i class="fa-solid ${d.status === 'ativo' ? 'fa-user-slash' : 'fa-user-check'}"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    updateDoctorCounters();
}

function filterDoctors() {
    renderDoctorsGrid();
}

function filterBySpecialty(specialty, element) {
    selectedSpecialtyFilter = specialty;
    document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');
    renderDoctorsGrid();
}

function toggleDoctorStatusById(id) {
    const doc = doctorsData.find(d => d.id === id);
    if (!doc) return;

    if (doc.status === 'ativo') {
        doc.status = 'ferias';
        showToast(`Profissional ${doc.name} marcado como Férias.`);
    } else {
        doc.status = 'ativo';
        showToast(`Profissional ${doc.name} reativado com sucesso!`);
    }

    renderDoctorsGrid();
    recalculateAllMetrics();
}

function editDoctorById(id) {
    const doc = doctorsData.find(d => d.id === id);
    if (!doc) return;

    document.getElementById('modal-doctor-title').innerText = 'Editar Profissional';
    document.getElementById('doc-nome').value = doc.name;
    document.getElementById('doc-reg').value = doc.reg;
    document.getElementById('doc-spec').value = doc.spec;
    document.getElementById('doc-tel').value = doc.phone;
    openModal('modal-profissional');
}

function openDoctorDrawer(name, initials, reg, spec, phone, summary) {
    document.getElementById('d-doctor-name').innerText = name;
    document.getElementById('d-doctor-avatar').innerText = initials;
    document.getElementById('d-doctor-reg').innerText = `${reg} • ${spec}`;
    document.getElementById('d-doctor-phone').innerText = phone;
    document.getElementById('d-doctor-summary').innerText = summary;

    const drawer = document.getElementById('drawer-doctor');
    if (drawer) drawer.classList.add('active');
}

function updateDoctorCounters() {
    const total = doctorsData.length;
    const active = doctorsData.filter(d => d.status === 'ativo').length;
    const vacation = doctorsData.filter(d => d.status === 'ferias').length;

    animateValue('stat-total-doctors', total);
    animateValue('stat-working-today', active);
    animateValue('stat-vacation-doctors', vacation);
}

function exportDoctors() {
    showToast('Lista do corpo clínico exportada em PDF com sucesso!');
}

// ============================================================
// 12. COMPATIBILITY WRAPPERS (ELEMENT-BASED FALLBACKS)
// ============================================================
function editPatient(btn) {
    const row = btn.closest('tr');
    if (row && row.dataset.id) {
        editPatientById(row.dataset.id);
    }
}

function togglePatientStatus(btn) {
    const row = btn.closest('tr');
    if (row && row.dataset.id) {
        togglePatientStatusById(row.dataset.id);
    }
}

function updateStatus(btn, newStatus) {
    const slot = btn.closest('.timeline-slot');
    if (slot && slot.dataset.id) {
        updateAppointmentStatus(slot.dataset.id, newStatus);
    }
}

function editDoctor(btn) {
    const card = btn.closest('.doctor-card');
    if (card && card.dataset.id) {
        editDoctorById(card.dataset.id);
    }
}

function toggleDoctorStatus(btn) {
    const card = btn.closest('.doctor-card');
    if (card && card.dataset.id) {
        toggleDoctorStatusById(card.dataset.id);
    }
}
