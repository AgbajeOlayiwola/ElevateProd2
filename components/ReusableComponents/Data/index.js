import MoreSvg from '../MoreSvg';
import PaymentSvg from '../PaymentSvg';
import NairaSvg from '../NairaSvg';
import BulkTransfer from '../BulkTransfSvg';
import StarSharp from '../StarSharpSvg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import SingleTrans from '../SingleTransSvg';
import BulkTransfer2 from '../BulkTransfSvg/bulktrans';
import BillTransfer from '../BillTransSvg';
import FxTrans from '../FxtransSvg';
import Paylink2 from '../PaylinkSvg/paylink';
import Ussd from '../UssdSvg';
import MposSvg2 from '../mPOSSvg/Mpos';
import EcobankQRSvg from '../EcobankQRSvg';

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/Dashboard',

        icon: <MdIcons.MdDashboard />,
        iconActive: <MdIcons.MdDashboard />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />
    },

    {
        // <MdIcons.MdOutlinePayments />
        title: 'Payment',
        path: '/Payment',
        modal: 'show',
        icon: <PaymentSvg fillColor={false} />,
        iconActive: <PaymentSvg fillColor={true} />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />,
        subNavTitles: ['Receive Payment', 'Make Payment'],
        subNav: [
            {
                title: 'Paylink',
                path: 'Paylink',
                icon: <BiIcons.BiLinkAlt />,
                subNavTitle: 'Receive Payment'
            },
            {
                title: 'USSD',
                path: 'USSD only',
                icon: <StarSharp />,
                subNavTitle: 'Receive Payment'
            },
            {
                title: 'Ecobank QR',
                path: 'Ecobank QR Only',
                icon: <BiIcons.BiScan />,
                subNavTitle: 'Receive Payment'
            },
            {
                title: 'mPOS',
                path: 'Phone Pos',
                icon: <HiIcons.HiOutlineCreditCard />,
                subNavTitle: 'Receive Payment'
            },
            {
                title: 'Single Transfer',
                path: 'Single Transfer',
                icon: <BiIcons.BiTransfer />,
                subNavTitle: 'Make Payment'
            },
            {
                title: 'Bulk Transfer',
                path: 'Bulk Transfer',
                icon: <BulkTransfer />,
                subNavTitle: 'Make Payment'
            },
            {
                title: 'Bill Payment',
                path: 'Bills Payment',
                icon: <NairaSvg />,
                subNavTitle: 'Make Payment'
            },
            {
                title: 'FX Transfer',
                path: 'FX Transfer ',
                icon: <FaIcons.FaHandHoldingUsd />,
                subNavTitle: 'Make Payment'
            }
        ]
    },
    {
        title: 'Transactions',
        path: '/Transactions',
        icon: <CgIcons.CgMoreO />,
        iconActive: <CgIcons.CgMoreO />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />
    },

    {
        title: 'Tools',
        path: '/Tools',
        icon: <FiIcons.FiSettings />,
        iconActive: <FiIcons.FiSettings />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />,
        subNav: [
            {
                title: 'Analysis',
                path: '',
                icon: <BiIcons.BiTransfer />
            },
            {
                title: 'Inventory',
                path: '',
                icon: <BulkTransfer />
            },
            {
                title: 'e invoice',
                path: '',
                icon: <NairaSvg />
            },
            {
                title: 'Others',
                path: '',
                icon: <FaIcons.FaHandHoldingUsd />
            }
        ]
    }
];

export const transactionData = [
    {
        name: 'James Ewang',
        transfer: 'Transfer',
        ammount: '+40,000',
        color: 'styles.greendot'
    },
    {
        name: 'James Ewang',
        transfer: 'Transfer',
        ammount: '+40,000',
        color: 'styles.reddot'
    },
    {
        name: 'James Ewang',
        transfer: 'Transfer',
        ammount: '+40,000',
        color: 'styles.reddot'
    },
    {
        name: 'James Ewang',
        transfer: 'Transfer',
        ammount: '+40,000',
        color: 'styles.reddot'
    },
    {
        name: 'James Ewang',
        transfer: 'Transfer',
        ammount: '+40,000',
        color: 'styles.greendot'
    },
    {
        name: 'James Ewang',
        transfer: 'Transfer',
        ammount: '+40,000',
        color: 'styles.greendot'
    },
    {
        name: 'James Ewang',
        transfer: 'Transfer',
        ammount: '+40,000',
        color: 'styles.greendot'
    }
];

export const RecievePayment = [
    {
        title: 'By Ecobank Pay (QR)',
        path: 'Ecobank QR only',
        icon: <BiIcons.BiScan />
    },
    {
        title: 'By Phone POS',
        path: 'Phone POS',
        icon: <HiIcons.HiOutlineCreditCard />
    },
    {
        title: 'USSD',
        path: 'USSD only',
        icon: <StarSharp />
    },
    {
        title: 'Paylink',
        path: 'Paylink',
        icon: <BiIcons.BiLinkAlt />
    }
];

export const MakePayment = [
    {
        title: 'Bills Payment',
        path: 'Bills Payment',
        icon: <NairaSvg />
    },
    {
        title: 'Single Transfer',
        path: 'Single Transfer',
        icon: <BiIcons.BiTransfer />
    },
    {
        title: 'Bulk Transfer',
        path: 'Bulk Transfer',
        icon: <BulkTransfer />
    },

    {
        title: 'FX Transfer',
        path: 'FX Transfer ',
        icon: <FaIcons.FaHandHoldingUsd />
    }
];
export const OtherAccounts = [
    {
        ammount: '₦22,094',
        account: 'Personal Savings Account'
    },
    {
        ammount: '₦22,094',
        account: 'Ecobank Omnilite Account'
    }
];

export const PaymentData = {
    make: [
        {
            icon: <BillTransfer />,
            text: 'Bills Payment'
        },
        {
            icon: <SingleTrans />,
            text: 'Single Transfer'
        },
        {
            icon: <BulkTransfer2 />,
            text: 'Bulk Transfer'
        },

        {
            icon: <FxTrans />,
            text: 'FX Transfer '
        }
    ],
    receive: [
        {
            icon: <EcobankQRSvg />,
            text: 'Ecobank QR Only'
        },
        {
            icon: <MposSvg2 />,
            text: 'Phone POS'
        },
        {
            icon: <Ussd />,
            text: 'USSD only'
        },
        {
            icon: <Paylink2 />,
            text: 'Paylink'
        }
    ]
};

export const location = [
    {
        state: 'Abia ',
        localGoverment: [
            'Aba North',
            'Aba South',
            'Arochukwu',
            'Bende',
            'Ikwuano',
            'Isiala Ngwa North',
            'Isiala Ngwa South',
            'Isuikwuato',
            'Obi Ngwa',
            'Ohafia',
            'Osisioma',
            'Ugwunagbo',
            'Ukwa East',
            'Ukwa West',
            'Umuahia North',
            'Umuahia South',
            'Umu Nneochi'
        ]
    },
    {
        state: 'Adamawa ',
        localGoverment: [
            'Demsa',
            'Fufure',
            'Ganye',
            'Gayuk',
            'Girei',
            'Gombi',
            'Hong',
            'Jada',
            'Lamurde',
            'Madagali',
            'Maiha',
            'Mayo Belwa',
            'Michika',
            'Mubi North',
            'Mubi South',
            'Numan',
            'Shelleng',
            'Song',
            'Toungo',
            'Yola North',
            'Yola South'
        ]
    },
    {
        state: 'Akwa Ibom ',
        localGoverment: [
            'Abak',
            'Eastern Obolo',
            'Eket',
            'Esit Eket',
            'Essien Udim',
            'Etim Ekpo',
            'Etinan',
            'Ibeno',
            'Ibesikpo Asutan',
            'Ibiono-Ibom',
            'Ika',
            'Ikono',
            'Ikot Abasi',
            'Ikot Ekpene',
            'Ini',
            'Itu',
            'Mbo',
            'Mkpat-Enin',
            'Nsit-Atai',
            'Nsit-Ibom',
            'Nsit-Ubium',
            'Obot Akara',
            'Okobo',
            'Onna',
            'Oron',
            'Oruk Anam',
            'Udung-Uko',
            'Ukanafun',
            'Uruan',
            'Urue-Offong/Oruko',
            'Uyo'
        ]
    },
    {
        state: 'Anambra ',
        localGoverment: [
            'Aguata',
            'Anambra East',
            'Anambra West',
            'Anaocha',
            'Awka North',
            'Awka South',
            'Ayamelum',
            'Dunukofia',
            'Ekwusigo',
            'Idemili North',
            'Idemili South',
            'Ihiala',
            'Njikoka',
            'Nnewi North',
            'Nnewi South',
            'Ogbaru',
            'Onitsha North',
            'Onitsha South',
            'Orumba North',
            'Orumba South',
            'Oyi'
        ]
    },
    {
        state: 'Bauchi ',
        localGoverment: [
            'Alkaleri',
            'Bauchi',
            'Bogoro',
            'Damban',
            'Darazo',
            'Dass',
            'Gamawa',
            'Ganjuwa',
            'Giade',
            'Itas/Gadau',
            "Jama'are",
            'Katagum',
            'Kirfi',
            'Misau',
            'Ningi',
            'Shira',
            'Tafawa Balewa',
            'Toro',
            'Warji',
            'Zaki'
        ]
    },
    {
        state: 'Bayelsa ',
        localGoverment: [
            'Brass',
            'Ekeremor',
            'Kolokuma/Opokuma',
            'Nembe',
            'Ogbia',
            'Sagbama',
            'Southern Ijaw',
            'Yenagoa'
        ]
    },
    {
        state: 'Benue ',
        localGoverment: [
            'Ado',
            'Agatu',
            'Apa',
            'Buruku',
            'Gboko',
            'Guma',
            'Gwer East',
            'Gwer West',
            'Katsina-Ala',
            'Konshisha',
            'Kwande',
            'Logo',
            'Makurdi',
            'Obi',
            'Ogbadibo',
            'Ohimini',
            'Oju',
            'Okpokwu',
            'Oturkpo',
            'Tarka',
            'Ukum',
            'Ushongo',
            'Vandeikya'
        ]
    },
    {
        state: 'Borno ',
        localGoverment: [
            'Abadam',
            'Askira/Uba',
            'Bama',
            'Bayo',
            'Biu',
            'Chibok',
            'Damboa',
            'Dikwa',
            'Gubio',
            'Guzamala',
            'Gwoza',
            'Hawul',
            'Jere',
            'Kaga',
            'Kala/Balge',
            'Konduga',
            'Kukawa',
            'Kwaya Kusar',
            'Mafa',
            'Magumeri',
            'Maiduguri',
            'Marte',
            'Mobbar',
            'Monguno',
            'Ngala',
            'Nganzai',
            'Shani'
        ]
    },
    {
        state: 'Cross River ',
        localGoverment: [
            'Abi',
            'Akamkpa',
            'Akpabuyo',
            'Bakassi',
            'Bekwarra',
            'Biase',
            'Boki',
            'Calabar Municipal',
            'Calabar South',
            'Etung',
            'Ikom',
            'Obanliku',
            'Obubra',
            'Obudu',
            'Odukpani',
            'Ogoja',
            'Yakuur',
            'Yala'
        ]
    },
    {
        state: 'Delta ',
        localGoverment: [
            'Aniocha North',
            'Aniocha South',
            'Bomadi',
            'Burutu',
            'Ethiope East',
            'Ethiope West',
            'Ika North East',
            'Ika South',
            'Isoko North',
            'Isoko South',
            'Ndokwa East',
            'Ndokwa West',
            'Okpe',
            'Oshimili North',
            'Oshimili South',
            'Patani',
            'Sapele',
            'Udu',
            'Ughelli North',
            'Ughelli South',
            'Ukwuani',
            'Uvwie',
            'Warri North',
            'Warri South',
            'Warri South West'
        ]
    },
    {
        state: 'Ebonyi ',
        localGoverment: [
            'Abakaliki',
            'Afikpo North',
            'Afikpo South (Edda)',
            'Ebonyi',
            'Ezza North',
            'Ezza South',
            'Ikwo',
            'Ishielu',
            'Ivo',
            'Izzi',
            'Ohaozara',
            'Ohaukwu',
            'Onicha'
        ]
    },
    {
        state: 'Edo ',
        localGoverment: [
            'Akoko-Edo',
            'Egor',
            'Esan Central',
            'Esan North-East',
            'Esan South-East',
            'Esan West',
            'Etsako Central',
            'Etsako East',
            'Etsako West',
            'Igueben',
            'Ikpoba Okha',
            'Orhionmwon',
            'Oredo',
            'Ovia North-East',
            'Ovia South-West',
            'Owan East',
            'Owan West',
            'Uhunmwonde'
        ]
    },
    {
        state: 'Ekiti ',
        localGoverment: [
            'Ado Ekiti',
            'Efon',
            'Ekiti East',
            'Ekiti South-West',
            'Ekiti West',
            'Emure',
            'Gbonyin',
            'Ido Osi',
            'Ijero',
            'Ikere',
            'Ikole',
            'Ilejemeje',
            'Irepodun/Ifelodun',
            'Ise/Orun',
            'Moba',
            'Oye'
        ]
    },
    {
        state: 'Enugu ',
        localGoverment: [
            'Aninri',
            'Awgu',
            'Enugu East',
            'Enugu North',
            'Enugu South',
            'Ezeagu',
            'Igbo Etiti',
            'Igbo Eze North',
            'Igbo Eze South',
            'Isi Uzo',
            'Nkanu East',
            'Nkanu West',
            'Nsukka',
            'Oji River',
            'Udenu',
            'Udi',
            'Uzo-Uwani'
        ]
    },
    {
        state: 'Gombe ',
        localGoverment: [
            'Akko',
            'Balanga',
            'Billiri',
            'Dukku',
            'Funakaye',
            'Gombe',
            'Kaltungo',
            'Kwami',
            'Nafada',
            'Shongom',
            'Yamaltu/Deba'
        ]
    },
    {
        state: 'Imo ',
        localGoverment: [
            'Aboh Mbaise',
            'Ahiazu Mbaise',
            'Ehime Mbano',
            'Ezinihitte',
            'Ideato North',
            'Ideato South',
            'Ihitte/Uboma',
            'Ikeduru',
            'Isiala Mbano',
            'Isu',
            'Mbaitoli',
            'Ngor Okpala',
            'Njaba',
            'Nkwerre',
            'Nwangele',
            'Obowo',
            'Oguta',
            'Ohaji/Egbema',
            'Okigwe',
            'Orlu',
            'Orsu',
            'Oru East',
            'Oru West',
            'Owerri Municipal',
            'Owerri North',
            'Owerri West',
            'Unuimo'
        ]
    },
    {
        state: 'Jigawa ',
        localGoverment: [
            'Auyo',
            'Babura',
            'Biriniwa',
            'Birnin Kudu',
            'Buji',
            'Dutse',
            'Gagarawa',
            'Garki',
            'Gumel',
            'Guri',
            'Gwaram',
            'Gwiwa',
            'Hadejia',
            'Jahun',
            'Kafin Hausa',
            'Kaugama',
            'Kazaure',
            'Kiri Kasama',
            'Kiyawa',
            'Maigatari',
            'Malam Madori',
            'Miga',
            'Ringim',
            'Roni',
            'Sule Tankarkar',
            'Taura',
            'Yankwashi'
        ]
    },
    {
        state: 'Kaduna ',
        localGoverment: [
            'Birnin Gwari',
            'Chikun',
            'Giwa',
            'Igabi',
            'Ikara',
            'Jaba',
            "Jema'a",
            'Kachia',
            'Kaduna North',
            'Kaduna South',
            'Kagarko',
            'Kajuru',
            'Kaura',
            'Kauru',
            'Kubau',
            'Kudan',
            'Lere',
            'Makarfi',
            'Sabon Gari',
            'Sanga',
            'Soba',
            'Zangon Kataf',
            'Zaria'
        ]
    },
    {
        state: 'Kano ',
        localGoverment: [
            'Ajingi',
            'Albasu',
            'Bagwai',
            'Bebeji',
            'Bichi',
            'Bunkure',
            'Dala',
            'Dambatta',
            'Dawakin Kudu',
            'Dawakin Tofa',
            'Doguwa',
            'Fagge',
            'Gabasawa',
            'Garko',
            'Garun Mallam',
            'Gaya',
            'Gezawa',
            'Gwale',
            'Gwarzo',
            'Kabo',
            'Kano Municipal',
            'Karaye',
            'Kibiya',
            'Kiru',
            'Kumbotso',
            'Kunchi',
            'Kura',
            'Madobi',
            'Makoda',
            'Minjibir',
            'Nasarawa',
            'Rano',
            'Rimin Gado',
            'Rogo',
            'Shanono',
            'Sumaila',
            'Takai',
            'Tarauni',
            'Tofa',
            'Tsanyawa',
            'Tudun Wada',
            'Ungogo',
            'Warawa',
            'Wudil'
        ]
    },
    {
        state: 'Katsina ',
        localGoverment: [
            'Bakori',
            'Batagarawa',
            'Batsari',
            'Baure',
            'Bindawa',
            'Charanchi',
            'Dandume',
            'Danja',
            'Dan Musa',
            'Daura',
            'Dutsi',
            'Dutsin Ma',
            'Faskari',
            'Funtua',
            'Ingawa',
            'Jibia',
            'Kafur',
            'Kaita',
            'Kankara',
            'Kankia',
            'Katsina',
            'Kurfi',
            'Kusada',
            "Mai'Adua",
            'Malumfashi',
            'Mani',
            'Mashi',
            'Matazu',
            'Musawa',
            'Rimi',
            'Sabuwa',
            'Safana',
            'Sandamu',
            'Zango'
        ]
    },
    {
        state: 'Kebbi ',
        localGoverment: [
            'Aleiro',
            'Arewa',
            'Argungu',
            'Augie',
            'Bagudo',
            'Birnin Kebbi',
            'Bunza',
            'Dandi',
            'Fakai',
            'Gwandu',
            'Jega',
            'Kalgo',
            'Koko/Besse',
            'Maiyama',
            'Ngaski',
            'Sakaba',
            'Shanga',
            'Suru',
            'Danko-Wasagu',
            'Yauri',
            'Zuru'
        ]
    },
    {
        state: 'Kogi ',
        localGoverment: [
            'Adavi',
            'Ajaokuta',
            'Ankpa',
            'Bassa',
            'Dekina',
            'Ibaji',
            'Idah',
            'Igalamela Odolu',
            'Ijumu',
            'Kabba/Bunu',
            'Kogi',
            'Lokoja',
            'Mopa Muro',
            'Ofu',
            'Ogori/Magongo',
            'Okehi',
            'Okene',
            'Olamaboro',
            'Omala',
            'Yagba East',
            'Yagba West'
        ]
    },
    {
        state: 'Kwara ',
        localGoverment: [
            'Asa',
            'Baruten',
            'Edu',
            'Ekiti',
            'Ifelodun',
            'Ilorin East',
            'Ilorin South',
            'Ilorin West',
            'Irepodun',
            'Isin',
            'Kaiama',
            'Moro',
            'Offa',
            'Oke Ero',
            'Oyun',
            'Pategi'
        ]
    },
    {
        state: 'Lagos ',
        localGoverment: [
            'Agege',
            'Ajeromi-Ifelodun',
            'Alimosho',
            'Amuwo-Odofin',
            'Apapa',
            'Badagry',
            'Epe',
            'Eti Osa',
            'Ibeju-Lekki',
            'Ifako-Ijaiye',
            'Ikeja',
            'Ikorodu',
            'Kosofe',
            'Lagos Island',
            'Lagos Mainland',
            'Mushin',
            'Ojo',
            'Oshodi-Isolo',
            'Shomolu',
            'Surulere'
        ]
    },
    {
        state: 'Nasarawa ',
        localGoverment: [
            'Akwanga',
            'Awe',
            'Doma',
            'Karu',
            'Keana',
            'Keffi',
            'Kokona',
            'Lafia',
            'Nasarawa',
            'Nasarawa Egon',
            'Obi',
            'Toto',
            'Wamba'
        ]
    },
    {
        state: 'Niger ',
        localGoverment: [
            'Agaie',
            'Agwara',
            'Bida',
            'Borgu',
            'Bosso',
            'Chanchaga',
            'Edati',
            'Gbako',
            'Gurara',
            'Katcha',
            'Kontagora',
            'Lapai',
            'Lavun',
            'Magama',
            'Mariga',
            'Mashegu',
            'Mokwa',
            'Moya',
            'Paikoro',
            'Rafi',
            'Rijau',
            'Shiroro',
            'Suleja',
            'Tafa',
            'Wushishi'
        ]
    },
    {
        state: 'Ogun ',
        localGoverment: [
            'Abeokuta North',
            'Abeokuta South',
            'Ado-Odo/Ota',
            'Ewekoro',
            'Ifo',
            'Ijebu East',
            'Ijebu North',
            'Ijebu North East',
            'Ijebu Ode',
            'Ikenne',
            'Imeko Afon',
            'Ipokia',
            'Obafemi Owode',
            'Odeda',
            'Odogbolu',
            'Ogun Waterside',
            'Remo North',
            'Shagamu',
            'Yewa North',
            'Yewa South'
        ]
    },
    {
        state: 'Ondo ',
        localGoverment: [
            'Akoko North-East',
            'Akoko North-West',
            'Akoko South-East',
            'Akoko South-West',
            'Akure North',
            'Akure South',
            'Ese Odo',
            'Idanre',
            'Ifedore',
            'Ilaje',
            'Ile Oluji/Okeigbo',
            'Irele',
            'Odigbo',
            'Okitipupa',
            'Ondo West',
            'Ondo East',
            'Ose',
            'Owo'
        ]
    },
    {
        state: 'Osun ',
        localGoverment: [
            'Aiyedaade',
            'Aiyedire',
            'Atakunmosa East',
            'Atakunmosa West',
            'Boluwaduro',
            'Boripe',
            'Ede North',
            'Ede South',
            'Egbedore',
            'Ejigbo',
            'Ife Central',
            'Ife East',
            'Ife North',
            'Ife South',
            'Ifedayo',
            'Ifelodun',
            'Ila',
            'Ilesa East',
            'Ilesa West',
            'Irepodun',
            'Irewole',
            'Isokan',
            'Iwo',
            'Obokun',
            'Odo Otin',
            'Ola Oluwa',
            'Olorunda',
            'Oriade',
            'Orolu',
            'Osogbo'
        ]
    },
    {
        state: 'Oyo ',
        localGoverment: [
            'Afijio',
            'Akinyele',
            'Atiba',
            'Atisbo',
            'Egbeda',
            'Ibadan North',
            'Ibadan North-East',
            'Ibadan North-West',
            'Ibadan South-East',
            'Ibadan South-West',
            'Ibarapa Central',
            'Ibarapa East',
            'Ibarapa North',
            'Ido',
            'Irepo',
            'Iseyin',
            'Itesiwaju',
            'Iwajowa',
            'Kajola',
            'Lagelu',
            'Ogbomosho North',
            'Ogbomosho South',
            'Ogo Oluwa',
            'Olorunsogo',
            'Oluyole',
            'Ona Ara',
            'Orelope',
            'Ori Ire',
            'Oyo East',
            'Oyo West',
            'Saki East',
            'Saki West',
            'Surulere'
        ]
    },
    {
        state: 'Plateau ',
        localGoverment: [
            'Bokkos',
            'Barkin Ladi',
            'Bassa',
            'Jos East',
            'Jos North',
            'Jos South',
            'Kanam',
            'Kanke',
            'Langtang North',
            'Langtang South',
            'Mangu',
            'Mikang',
            'Pankshin',
            "Qua'an Pan",
            'Riyom',
            'Shendam',
            'Wase'
        ]
    },
    {
        state: 'Rivers ',
        localGoverment: [
            'Abua/Odual',
            'Ahoada East',
            'Ahoada West',
            'Akuku-Toru',
            'Andoni',
            'Asari-Toru',
            'Bonny',
            'Degema',
            'Eleme',
            'Emuoha',
            'Etche',
            'Gokana',
            'Ikwerre',
            'Khana',
            'Obio/Akpor',
            'Ogba/Egbema/Ndoni',
            'Ogu/Bolo',
            'Okrika',
            'Omuma',
            'Opobo/Nkoro',
            'Oyigbo',
            'Port Harcourt',
            'Tai'
        ]
    },
    {
        state: 'Sokoto ',
        localGoverment: [
            'Binji',
            'Bodinga',
            'Dange Shuni',
            'Gada',
            'Goronyo',
            'Gudu',
            'Gwadabawa',
            'Illela',
            'Isa',
            'Kebbe',
            'Kware',
            'Rabah',
            'Sabon Birni',
            'Shagari',
            'Silame',
            'Sokoto North',
            'Sokoto South',
            'Tambuwal',
            'Tangaza',
            'Tureta',
            'Wamako',
            'Wurno',
            'Yabo'
        ]
    },
    {
        state: 'Taraba ',
        localGoverment: [
            'Ardo Kola',
            'Bali',
            'Donga',
            'Gashaka',
            'Gassol',
            'Ibi',
            'Jalingo',
            'Karim Lamido',
            'Kumi',
            'Lau',
            'Sardauna',
            'Takum',
            'Ussa',
            'Wukari',
            'Yorro',
            'Zing'
        ]
    },
    {
        state: 'Yobe ',
        localGoverment: [
            'Bade',
            'Bursari',
            'Damaturu',
            'Fika',
            'Fune',
            'Geidam',
            'Gujba',
            'Gulani',
            'Jakusko',
            'Karasuwa',
            'Machina',
            'Nangere',
            'Nguru',
            'Potiskum',
            'Tarmuwa',
            'Yunusari',
            'Yusufari'
        ]
    },
    {
        state: 'Zamfara ',
        localGoverment: [
            'Anka',
            'Bakura',
            'Birnin Magaji/Kiyaw',
            'Bukkuyum',
            'Bungudu',
            'Chafe',
            'Gummi',
            'Gusau',
            'Kaura Namoda',
            'Maradun',
            'Maru',
            'Shinkafi',
            'Talata Mafara',
            'Zurmi'
        ]
    },
    {
        state: 'Federal Capital Territory',
        localGoverment: [
            'Abaji',
            'Abuja Municipal Area Council',
            'Bwari',
            'Gwagwalada',
            'Kuje',
            'Kwali'
        ]
    }
];
