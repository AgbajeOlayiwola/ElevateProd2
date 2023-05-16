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
import DashboardSvg from '../ReusableSvgComponents/DashboardSvg';
import PaymentSvg from '../ReusableSvgComponents/PaymentSvg';
import ToolSvg from '../ReusableSvgComponents/ToolSvg';
import StorefrontSvg from '../ReusableSvgComponents/StorefrontSvg';
import SettingsSvg from '../ReusableSvgComponents/SettingsSvg';
import PaymentActiveSvg from '../ReusableSvgComponents/PaymentActiveSvg';
import ToolsActiveSvg from '../ReusableSvgComponents/toolsActiveSvg';
import StorefrontActiveSvg from '../ReusableSvgComponents/StorefrontActiveSvg';
import SettingsActiveSvg from '../ReusableSvgComponents/SettingsActiveSvg';
import { BsFillCollectionFill, BsPiggyBankFill } from 'react-icons/bs';
import { HiBanknotes } from 'react-icons/hi';
export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/Dashboard',
        icon: <DashboardSvg fill="none" stroke="black" />,
        iconActive: <DashboardSvg fill="#6CCF00" stroke="none" />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />
    },

    {
        title: 'Payment',
        path: '/Payment',
        // modal: 'show',
        icon: <PaymentSvg />,
        iconActive: <PaymentActiveSvg />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />
        // subNav: [
        //     {
        //         title: 'Collections',
        //         path: '/Collections',
        //         icon: <BiIcons.BiTransfer />
        //     },
        //     {
        //         title: 'Payment',
        //         path: '/Payment',
        //         icon: <BiIcons.BiTransfer />
        //     },
        //     {
        //         title: 'Reports',
        //         path: '/Reports',
        //         icon: <BiIcons.BiTransfer />
        //     }
        // ]
    },

    {
        title: 'Collections',
        path: '/Collections',
        // modal: 'show',
        icon: <BsFillCollectionFill />,
        iconActive: <BsFillCollectionFill style={{ color: '#69940d' }} />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />
        // subNav: [
        //     {
        //         title: 'Collections',
        //         path: '/Collections',
        //         icon: <BiIcons.BiTransfer />
        //     },
        //     {
        //         title: 'Payment',
        //         path: '/Payment',
        //         icon: <BiIcons.BiTransfer />
        //     },
        //     {
        //         title: 'Reports',
        //         path: '/Reports',
        //         icon: <BiIcons.BiTransfer />
        //     }
        // ]
    },

    {
        title: 'Transaction Reports',
        path: '/Reports',
        // modal: 'show',
        icon: <PaymentSvg />,
        iconActive: <PaymentActiveSvg />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />
        // subNav: [
        //     {
        //         title: 'Collections',
        //         path: '/Collections',
        //         icon: <BiIcons.BiTransfer />
        //     },
        //     {
        //         title: 'Payment',
        //         path: '/Payment',
        //         icon: <BiIcons.BiTransfer />
        //     },
        //     {
        //         title: 'Reports',
        //         path: '/Reports',
        //         icon: <BiIcons.BiTransfer />
        //     }
        // ]
    },
    {
        title: 'Bank Statement',
        path: '/BankStatement',
        // modal: 'show',
        icon: <BsPiggyBankFill />,
        iconActive: <BsPiggyBankFill style={{ color: '#69940d' }} />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />
        // subNav: [
        //     {
        //         title: 'Collections',
        //         path: '/Collections',
        //         icon: <BiIcons.BiTransfer />
        //     },
        //     {
        //         title: 'Payment',
        //         path: '/Payment',
        //         icon: <BiIcons.BiTransfer />
        //     },
        //     {
        //         title: 'Reports',
        //         path: '/Reports',
        //         icon: <BiIcons.BiTransfer />
        //     }
        // ]
    },
    // {
    //     title: 'Tools',
    //     path: '/Tools',
    //     icon: <ToolSvg />,
    //     iconActive: <ToolsActiveSvg />,
    //     iconClosed: <RiIcons.RiArrowDownSLine />,
    //     iconOpened: <RiIcons.RiArrowUpSLine />,
    //     subNav: [
    //         {
    //             title: 'Analysis',
    //             path: '/Analysis',
    //             icon: <BiIcons.BiTransfer />
    //         },
    //         {
    //             title: 'Inventory',
    //             path: '/Inventory',
    //             icon: <BulkTransfer />
    //         },
    //         {
    //             title: 'e invoice',
    //             path: '/invoice',
    //             icon: <NairaSvg />
    //         },
    //         {
    //             title: 'Others',
    //             path: '/others',
    //             icon: <FaIcons.FaHandHoldingUsd />
    //         }
    //     ]
    // },
    // {
    //     title: 'Storefront',
    //     path: '/Storefront',
    //     icon: <StorefrontSvg />,
    //     iconActive: <StorefrontActiveSvg />,
    //     iconClosed: <RiIcons.RiArrowDownSLine />,
    //     iconOpened: <RiIcons.RiArrowUpSLine />
    // },
    // {
    //     title: 'Dispute ',
    //     path: '/Dispute',
    //     icon: <StorefrontSvg />,
    //     iconActive: <StorefrontActiveSvg />,
    //     iconClosed: <RiIcons.RiArrowDownSLine />,
    //     iconOpened: <RiIcons.RiArrowUpSLine />
    // },

    {
        title: 'Settings',
        path: '',
        icon: <SettingsSvg />,
        iconActive: <SettingsActiveSvg />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />,
        subNav: [
            {
                title: 'Profile Management',
                path: '/Profile',
                icon: <BiIcons.BiTransfer />
            },
            // {
            //     title: 'Customer Care Service',
            //     path: '/Customer',
            //     icon: <BulkTransfer />
            // },
            {
                title: 'Security',
                path: '/Security',
                icon: <NairaSvg />
            }
            // {
            //     title: 'Legal Terms & Conditions',
            //     path: '/Legal',
            //     icon: <FaIcons.FaHandHoldingUsd />
            // }
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
    }

    // {
    //     title: 'FX Transfer',
    //     path: 'FX Transfer ',
    //     icon: <FaIcons.FaHandHoldingUsd />
    // }
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
            text: 'Bills Payment',
            summary: 'Pay for your TV bills, electricity e.t.c'
        },
        {
            icon: <SingleTrans />,
            text: 'Single Transfer',
            summary: 'Send money to any nigerian bank'
        },
        {
            icon: <BulkTransfer2 />,
            text: 'Bulk Transfer',
            summary: 'Send money to multiple nigerian banks at once'
        },

        {
            icon: <FxTrans />,
            text: 'FX Transfer'
        }
    ],
    receive: [
        {
            icon: <EcobankQRSvg />,
            text: 'Ecobank QR Only',
            summary: 'Recieve payment using your phone camera'
        },
        {
            icon: <Paylink2 />,
            text: 'Paylink',
            summary: 'Pay for your TV bills, electricity e.t.c'
        },
        {
            icon: <Ussd />,
            text: 'USSD only',
            summary: 'Pay for your TV bills, electricity e.t.c'
        },
        {
            icon: <MposSvg2 />,
            text: 'Phone POS',
            summary: 'Pay for your TV bills, electricity e.t.c'
        }
    ]
};

export const location = [
    {
        state: 'Abia ',
        code: 'AB',
        localGoverment: [
            { lgaName: 'Aba North', lgaCode: 'AB001' },
            { lgaName: 'Aba South', lgaCode: 'AB002' },
            { lgaName: 'Arochukwu', lgaCode: 'AB003' },
            { lgaName: 'Bende', lgaCode: 'AB004' },
            { lgaName: 'Ikwuano', lgaCode: 'AB005' },
            { lgaName: 'Isiala Ngwa North', lgaCode: 'AB006' },
            { lgaName: 'Isiala Ngwa South', lgaCode: 'AB007' },
            { lgaName: 'Isuikwuato', lgaCode: 'AB008' },
            { lgaName: 'Obi Ngwa', lgaCode: 'AB009' },
            { lgaName: 'Ohafia', lgaCode: 'AB010' },
            { lgaName: 'Osisioma', lgaCode: 'AB011' },
            { lgaName: 'Ugwunagbo', lgaCode: 'AB012' },
            { lgaName: 'Ukwa East', lgaCode: 'AB013' },
            { lgaName: 'Ukwa West', lgaCode: 'AB014' },
            { lgaName: 'Umu Nneochi', lgaCode: 'AB015' },
            { lgaName: 'Umuahia North', lgaCode: 'AB016' },
            { lgaName: 'Umuahia South', lgaCode: 'AB017' }
        ]
    },
    {
        state: 'Adamawa ',
        code: 'AD',
        localGoverment: [
            { lgaName: 'Demsa', lgaCode: 'AD001' },
            { lgaName: 'Fufure', lgaCode: 'AD002' },
            { lgaName: 'Ganye', lgaCode: 'AD003' },
            { lgaName: 'Gayuk', lgaCode: 'AD004' },
            { lgaName: 'Girei', lgaCode: 'AD005' },
            { lgaName: 'Gombi', lgaCode: 'AD006' },
            { lgaName: 'Hong', lgaCode: 'AD007' },
            { lgaName: 'Jada', lgaCode: 'AD008' },
            { lgaName: 'Lamurde', lgaCode: 'AD009' },
            { lgaName: 'Madagali', lgaCode: 'AD010' },
            { lgaName: 'Maiha', lgaCode: 'AD011' },
            { lgaName: 'Mayo Belwa', lgaCode: 'AD012' },
            { lgaName: 'Michika', lgaCode: 'AD013' },
            { lgaName: 'Mubi North', lgaCode: 'AD014' },
            { lgaName: 'Mubi South', lgaCode: 'AD015' },
            { lgaName: 'Numan', lgaCode: 'AD016' },
            { lgaName: 'Shelleng', lgaCode: 'AD017' },
            { lgaName: 'Song', lgaCode: 'AD018' },
            { lgaName: 'Toungo', lgaCode: 'AD019' },
            { lgaName: 'Yola North', lgaCode: 'AD020' },
            { lgaName: 'Yola South', lgaCode: 'AD021' }
        ]
    },
    {
        state: 'Akwa Ibom ',
        code: 'AI ',
        localGoverment: [
            { lgaName: 'Abak', lgaCode: 'AI001' },
            { lgaName: 'Eastern Obolo', lgaCode: 'AI002' },
            { lgaName: 'Eket', lgaCode: 'AI003' },
            { lgaName: 'Esit Eket', lgaCode: 'AI004' },
            { lgaName: 'Essien Udim', lgaCode: 'AI005' },
            { lgaName: 'Etim Ekpo', lgaCode: 'AI006' },
            { lgaName: 'Etinan', lgaCode: 'AI007' },
            { lgaName: 'Ibeno', lgaCode: 'AI008' },
            { lgaName: 'Ibesikpo Asutan', lgaCode: 'AI009' },
            { lgaName: 'Ibiono-Ibom', lgaCode: 'AI010' },
            { lgaName: 'Ika', lgaCode: 'AI011' },
            { lgaName: 'Ikono', lgaCode: 'AI012' },
            { lgaName: 'Ikot Abasi', lgaCode: 'AI013' },
            { lgaName: 'Ikot Ekpene', lgaCode: 'AI014' },
            { lgaName: 'Ini', lgaCode: 'AI015' },
            { lgaName: 'Itu', lgaCode: 'AI016' },
            { lgaName: 'Mbo', lgaCode: 'AI017' },
            { lgaName: 'Mkpat-Enin', lgaCode: 'AI018' },
            { lgaName: 'Nsit-Atai', lgaCode: 'AI019' },
            { lgaName: 'Nsit-Ibom', lgaCode: 'AI020' },
            { lgaName: 'Nsit-Ubium', lgaCode: 'AI021' },
            { lgaName: 'Obot Akara', lgaCode: 'AI022' },
            { lgaName: 'Okobo', lgaCode: 'AI023' },
            { lgaName: 'Onna', lgaCode: 'AI024' },
            { lgaName: 'Oron', lgaCode: 'AI025' },
            { lgaName: 'Oruk Anam', lgaCode: 'AI026' },
            { lgaName: 'Udung-Uko', lgaCode: 'AI027' },
            { lgaName: 'Ukanafun', lgaCode: 'AI028' },
            { lgaName: 'Uruan', lgaCode: 'AI029' },
            { lgaName: 'Urue-Offong/Oruko', lgaCode: 'AI030' },
            { lgaName: 'Uyo', lgaCode: 'AI031' }
        ]
    },
    {
        state: 'Anambra ',
        code: 'AN ',
        localGoverment: [
            { lgaName: 'Aguata', lgaCode: 'AN001' },
            { lgaName: 'Anambra East', lgaCode: 'AN002' },
            { lgaName: 'Anambra West', lgaCode: 'AN003' },
            { lgaName: 'Anaocha', lgaCode: 'AN004' },
            { lgaName: 'Awka North', lgaCode: 'AN005' },
            { lgaName: 'Awka South', lgaCode: 'AN006' },
            { lgaName: 'Ayamelum', lgaCode: 'AN007' },
            { lgaName: 'Dunukofia', lgaCode: 'AN008' },
            { lgaName: 'Ekwusigo', lgaCode: 'AN009' },
            { lgaName: 'Idemili North', lgaCode: 'AN010' },
            { lgaName: 'Idemili South', lgaCode: 'AN011' },
            { lgaName: 'Ihiala', lgaCode: 'AN012' },
            { lgaName: 'Njikoka', lgaCode: 'AN013' },
            { lgaName: 'Nnewi North', lgaCode: 'AN014' },
            { lgaName: 'Nnewi South', lgaCode: 'AN015' },
            { lgaName: 'Ogbaru', lgaCode: 'AN016' },
            { lgaName: 'Onitsha North', lgaCode: 'AN017' },
            { lgaName: 'Onitsha South', lgaCode: 'AN018' },
            { lgaName: 'Orumba North', lgaCode: 'AN019' },
            { lgaName: 'Orumba South', lgaCode: 'AN020' },
            { lgaName: 'Oyi', lgaCode: 'AN021' }
        ]
    },
    {
        state: 'Bauchi ',
        code: 'BA ',
        localGoverment: [
            { lgaName: 'Alkaleri', lgaCode: 'BA001' },
            { lgaName: 'Bauchi', lgaCode: 'BA002' },
            { lgaName: 'Bogoro', lgaCode: 'BA003' },
            { lgaName: 'Damban', lgaCode: 'BA004' },
            { lgaName: 'Darazo', lgaCode: 'BA005' },
            { lgaName: 'Dass', lgaCode: 'BA006' },
            { lgaName: 'Gamawa', lgaCode: 'BA007' },
            { lgaName: 'Ganjuwa', lgaCode: 'BA008' },
            { lgaName: 'Giade', lgaCode: 'BA009' },
            { lgaName: 'Itas/Gadau', lgaCode: 'BA010' },
            { lgaName: "Jama'are", lgaCode: 'BA011' },
            { lgaName: 'Katagum', lgaCode: 'BA012' },
            { lgaName: 'Kirfi', lgaCode: 'BA013' },
            { lgaName: 'Misau', lgaCode: 'BA014' },
            { lgaName: 'Ningi', lgaCode: 'BA015' },
            { lgaName: 'Shira', lgaCode: 'BA016' },
            { lgaName: 'Tafawa Balewa', lgaCode: 'BA017' },
            { lgaName: 'Toro', lgaCode: 'BA018' },
            { lgaName: 'Warji', lgaCode: 'BA019' },
            { lgaName: 'Zaki', lgaCode: 'BA020' }
        ]
    },
    {
        state: 'Bayelsa ',
        code: 'BY',
        localGoverment: [
            { lgaName: 'Brass', lgaCode: 'BY001' },
            { lgaName: 'Ekeremor', lgaCode: 'BY002' },
            { lgaName: 'Kolokuma/Opokuma', lgaCode: 'BY003' },
            { lgaName: 'Nembe', lgaCode: 'BY004' },
            { lgaName: 'Ogbia', lgaCode: 'BY005' },
            { lgaName: 'Sagbama', lgaCode: 'BY006' },
            { lgaName: 'Southern Ijaw', lgaCode: 'BY007' },
            { lgaName: 'Yenagoa', lgaCode: 'BY008' }
        ]
    },
    {
        state: 'Benue ',
        code: 'BN ',
        localGoverment: [
            { lgaName: 'Ado', lgaCode: 'BN001' },
            { lgaName: 'Agatu', lgaCode: 'BN002' },
            { lgaName: 'Apa', lgaCode: 'BN003' },
            { lgaName: 'Buruku', lgaCode: 'BN004' },
            { lgaName: 'Gboko', lgaCode: 'BN005' },
            { lgaName: 'Guma', lgaCode: 'BN006' },
            { lgaName: 'Gwer East', lgaCode: 'BN007' },
            { lgaName: 'Gwer West', lgaCode: 'BN008' },
            { lgaName: 'Katsina-Ala', lgaCode: 'BN009' },
            { lgaName: 'Konshisha', lgaCode: 'BN010' },
            { lgaName: 'Kwande', lgaCode: 'BN011' },
            { lgaName: 'Logo', lgaCode: 'BN012' },
            { lgaName: 'Makurdi', lgaCode: 'BN013' },
            { lgaName: 'Obi', lgaCode: 'BN014' },
            { lgaName: 'Ogbadibo', lgaCode: 'BN015' },
            { lgaName: 'Ohimini', lgaCode: 'BN016' },
            { lgaName: 'Oju', lgaCode: 'BN017' },
            { lgaName: 'Okpokwu', lgaCode: 'BN018' },
            { lgaName: 'Oturkpo', lgaCode: 'BN019' },
            { lgaName: 'Tarka', lgaCode: 'BN020' },
            { lgaName: 'Ukum', lgaCode: 'BN021' },
            { lgaName: 'Ushongo', lgaCode: 'BN022' },
            { lgaName: 'Vandeikya', lgaCode: 'BN023' }
        ]
    },
    {
        state: 'Borno ',
        code: 'BR ',
        localGoverment: [
            { lgaName: 'Abadam', lgaCode: 'BR001' },
            { lgaName: 'Askira/Uba', lgaCode: 'BR002' },
            { lgaName: 'Bama', lgaCode: 'BR003' },
            { lgaName: 'Bayo', lgaCode: 'BR004' },
            { lgaName: 'Biu', lgaCode: 'BR005' },
            { lgaName: 'Chibok', lgaCode: 'BR006' },
            { lgaName: 'Damboa', lgaCode: 'BR007' },
            { lgaName: 'Dikwa', lgaCode: 'BR008' },
            { lgaName: 'Gubio', lgaCode: 'BR009' },
            { lgaName: 'Guzamala', lgaCode: 'BR010' },
            { lgaName: 'Gwoza', lgaCode: 'BR011' },
            { lgaName: 'Hawul', lgaCode: 'BR012' },
            { lgaName: 'Jere', lgaCode: 'BR013' },
            { lgaName: 'Kaga', lgaCode: 'BR014' },
            { lgaName: 'Kala/Balge', lgaCode: 'BR015' },
            { lgaName: 'Konduga', lgaCode: 'BR016' },
            { lgaName: 'Kukawa', lgaCode: 'BR017' },
            { lgaName: 'Kwaya Kusar', lgaCode: 'BR018' },
            { lgaName: 'Mafa', lgaCode: 'BR019' },
            { lgaName: 'Magumeri', lgaCode: 'BR020' },
            { lgaName: 'Maiduguri', lgaCode: 'BR021' },
            { lgaName: 'Marte', lgaCode: 'BR022' },
            { lgaName: 'Mobbar', lgaCode: 'BR023' },
            { lgaName: 'Monguno', lgaCode: 'BR024' },
            { lgaName: 'Ngala', lgaCode: 'BR025' },
            { lgaName: 'Nganzai', lgaCode: 'BR026' },
            { lgaName: 'Shani', lgaCode: 'BR027' }
        ]
    },
    {
        state: 'Cross River ',
        code: 'CR ',
        localGoverment: [
            { lgaName: 'Abi', lgaCode: 'CR001' },
            { lgaName: 'Akamkpa', lgaCode: 'CR002' },
            { lgaName: 'Akpabuyo', lgaCode: 'CR003' },
            { lgaName: 'Bakassi', lgaCode: 'CR004' },
            { lgaName: 'Bekwarra', lgaCode: 'CR005' },
            { lgaName: 'Biase', lgaCode: 'CR006' },
            { lgaName: 'Boki', lgaCode: 'CR007' },
            { lgaName: 'Calabar Municipal', lgaCode: 'CR008' },
            { lgaName: 'Calabar South', lgaCode: 'CR009' },
            { lgaName: 'Etung', lgaCode: 'CR010' },
            { lgaName: 'Ikom', lgaCode: 'CR011' },
            { lgaName: 'Obanliku', lgaCode: 'CR012' },
            { lgaName: 'Obubra', lgaCode: 'CR013' },
            { lgaName: 'Obudu', lgaCode: 'CR014' },
            { lgaName: 'Odukpani', lgaCode: 'CR015' },
            { lgaName: 'Ogoja', lgaCode: 'CR016' },
            { lgaName: 'Yakuur', lgaCode: 'CR017' },
            { lgaName: 'Yala', lgaCode: 'CR019' }
        ]
    },
    {
        state: 'Delta ',
        code: 'DE ',
        localGoverment: [
            { lgaName: 'Aniocha North', lgaCode: 'DE001' },
            { lgaName: 'Aniocha South', lgaCode: 'DE002' },
            { lgaName: 'Bomadi', lgaCode: 'DE003' },
            { lgaName: 'Burutu', lgaCode: 'DE004' },
            { lgaName: 'Ethiope East', lgaCode: 'DE005' },
            { lgaName: 'Ethiope West', lgaCode: 'DE006' },
            { lgaName: 'Ika North East', lgaCode: 'DE007' },
            { lgaName: 'Ika South', lgaCode: 'DE008' },
            { lgaName: 'Isoko North', lgaCode: 'DE009' },
            { lgaName: 'Isoko South', lgaCode: 'DE010' },
            { lgaName: 'Ndokwa East', lgaCode: 'DE011' },
            { lgaName: 'Ndokwa West', lgaCode: 'DE012' },
            { lgaName: 'Okpe', lgaCode: 'DE013' },
            { lgaName: 'Oshimili North', lgaCode: 'DE014' },
            { lgaName: 'Oshimili South', lgaCode: 'DE015' },
            { lgaName: 'Patani', lgaCode: 'DE016' },
            { lgaName: 'Sapele', lgaCode: 'DE017' },
            { lgaName: 'Udu', lgaCode: 'DE018' },
            { lgaName: 'Ughelli North', lgaCode: 'DE019' },
            { lgaName: 'Ughelli South', lgaCode: 'DE020' },
            { lgaName: 'Ukwuani', lgaCode: 'DE021' },
            { lgaName: 'Uvwie', lgaCode: 'DE022' },
            { lgaName: 'Warri North', lgaCode: 'DE023' },
            { lgaName: 'Warri South', lgaCode: 'DE024' },
            { lgaName: 'Warri South West', lgaCode: 'DE025' }
        ]
    },
    {
        state: 'Ebonyi ',
        code: 'EB ',
        localGoverment: [
            { lgaName: 'Abakaliki', lgaCode: 'EB001' },
            { lgaName: 'Afikpo North', lgaCode: 'EB002' },
            { lgaName: 'Afikpo South (Edda)', lgaCode: 'EB003' },
            { lgaName: 'Ebonyi', lgaCode: 'EB004' },
            { lgaName: 'Ezza North', lgaCode: 'EB005' },
            { lgaName: 'Ezza South', lgaCode: 'EB006' },
            { lgaName: 'Ikwo', lgaCode: 'EB007' },
            { lgaName: 'Ishielu', lgaCode: 'EB008' },
            { lgaName: 'Ivo', lgaCode: 'EB009' },
            { lgaName: 'Izzi', lgaCode: 'EB010' },
            { lgaName: 'Ohaozara', lgaCode: 'EB011' },
            { lgaName: 'Ohaukwu', lgaCode: 'EB012' },
            { lgaName: 'Onicha', lgaCode: 'EB013' }
        ]
    },
    {
        state: 'Edo ',
        code: 'ED ',
        localGoverment: [
            { lgaName: 'Akoko-Edo', lgaCode: 'ED001' },
            { lgaName: 'Egor', lgaCode: 'ED002' },
            { lgaName: 'Esan Central', lgaCode: 'ED003' },
            { lgaName: 'Esan North-East', lgaCode: 'ED004' },
            { lgaName: 'Esan South-East', lgaCode: 'ED005' },
            { lgaName: 'Esan West', lgaCode: 'ED006' },
            { lgaName: 'Etsako Central', lgaCode: 'ED007' },
            { lgaName: 'Etsako East', lgaCode: 'ED008' },
            { lgaName: 'Etsako West', lgaCode: 'ED009' },
            { lgaName: 'Igueben', lgaCode: 'ED010' },
            { lgaName: 'Ikpoba Okha', lgaCode: 'ED011' },
            { lgaName: 'Orhionmwon', lgaCode: 'ED012' },
            { lgaName: 'Oredo', lgaCode: 'ED013' },
            { lgaName: 'Ovia North-East', lgaCode: 'ED014' },
            { lgaName: 'Ovia South-West', lgaCode: 'ED015' },
            { lgaName: 'Owan East', lgaCode: 'ED016' },
            { lgaName: 'Owan West', lgaCode: 'ED017' },
            { lgaName: 'Uhunmwonde', lgaCode: 'ED018' }
        ]
    },
    {
        state: 'Ekiti ',
        code: 'EK ',
        localGoverment: [
            { lgaName: 'Ado Ekiti', lgaCode: 'EK001' },
            { lgaName: 'Gbonyin/Aiyedire', lgaCode: 'EK002' },
            { lgaName: 'Efon', lgaCode: 'EK003' },
            { lgaName: 'Ekiti East', lgaCode: 'EK004' },
            { lgaName: 'Ekiti South-West', lgaCode: 'EK005' },
            { lgaName: 'Ekiti West', lgaCode: 'EK006' },
            { lgaName: 'Emure', lgaCode: 'EK007' },
            { lgaName: 'Ido Osi', lgaCode: 'EK008' },
            { lgaName: 'Ijero', lgaCode: 'EK009' },
            { lgaName: 'Ikere', lgaCode: 'EK010' },
            { lgaName: 'Ikole', lgaCode: 'EK011' },
            { lgaName: 'Ilejemeje', lgaCode: 'EK012' },
            { lgaName: 'Irepodun/Ifelodun', lgaCode: 'EK013' },
            { lgaName: 'Ise/Orun', lgaCode: 'EK014' },
            { lgaName: 'Moba', lgaCode: 'EK015' },
            { lgaName: 'Oye', lgaCode: 'EK016' }
        ]
    },
    {
        state: 'Enugu ',
        code: 'EN ',
        localGoverment: [
            { lgaName: 'Aninri', lgaCode: 'EN001' },
            { lgaName: 'Awgu', lgaCode: 'EN002' },
            { lgaName: 'Enugu East', lgaCode: 'EN003' },
            { lgaName: 'Enugu North', lgaCode: 'EN004' },
            { lgaName: 'Enugu South', lgaCode: 'EN005' },
            { lgaName: 'Ezeagu', lgaCode: 'EN006' },
            { lgaName: 'Igbo Etiti', lgaCode: 'EN007' },
            { lgaName: 'Igbo Eze North', lgaCode: 'EN008' },
            { lgaName: 'Igbo Eze South', lgaCode: 'EN009' },
            { lgaName: 'Isi Uzo', lgaCode: 'EN010' },
            { lgaName: 'Nkanu East', lgaCode: 'EN011' },
            { lgaName: 'Nkanu West', lgaCode: 'EN012' },
            { lgaName: 'Nsukka', lgaCode: 'EN013' },
            { lgaName: 'Oji River', lgaCode: 'EN014' },
            { lgaName: 'Udenu', lgaCode: 'EN015' },
            { lgaName: 'Udi', lgaCode: 'EN016' },
            { lgaName: 'Uzo-Uwani', lgaCode: 'EN017' }
        ]
    },
    {
        state: 'Gombe ',
        code: 'GB ',
        localGoverment: [
            { lgaName: 'Akko', lgaCode: 'GB001' },
            { lgaName: 'Balanga', lgaCode: 'GB002' },
            { lgaName: 'Billiri', lgaCode: 'GB003' },
            { lgaName: 'Dukku', lgaCode: 'GB004' },
            { lgaName: 'Funakaye', lgaCode: 'GB005' },
            { lgaName: 'Gombe', lgaCode: 'GB006' },
            { lgaName: 'Kaltungo', lgaCode: 'GB007' },
            { lgaName: 'Kwami', lgaCode: 'GB008' },
            { lgaName: 'Nafada', lgaCode: 'GB009' },
            { lgaName: 'Shongom', lgaCode: 'GB010' },
            { lgaName: 'Yamaltu/Deba', lgaCode: 'GB011' }
        ]
    },
    {
        state: 'Imo ',
        code: 'IM ',
        localGoverment: [
            { lgaName: 'Aboh Mbaise', lgaCode: 'IM001' },
            { lgaName: 'Ahiazu Mbaise', lgaCode: 'IM002' },
            { lgaName: 'Ehime Mbano', lgaCode: 'IM003' },
            { lgaName: 'Ezinihitte', lgaCode: 'IM004' },
            { lgaName: 'Ideato North', lgaCode: 'IM005' },
            { lgaName: 'Ideato South', lgaCode: 'IM006' },
            { lgaName: 'Ihitte/Uboma', lgaCode: 'IM007' },
            { lgaName: 'Ikeduru', lgaCode: 'IM008' },
            { lgaName: 'Isiala Mbano', lgaCode: 'IM009' },
            { lgaName: 'Isu', lgaCode: 'IM010' },
            { lgaName: 'Mbaitoli', lgaCode: 'IM011' },
            { lgaName: 'Ngor Okpala', lgaCode: 'IM012' },
            { lgaName: 'Njaba', lgaCode: 'IM013' },
            { lgaName: 'Nkwerre', lgaCode: 'IM014' },
            { lgaName: 'Nwangele', lgaCode: 'IM015' },
            { lgaName: 'Obowo', lgaCode: 'IM016' },
            { lgaName: 'Oguta', lgaCode: 'IM017' },
            { lgaName: 'Ohaji/Egbema', lgaCode: 'IM018' },
            { lgaName: 'Okigwe', lgaCode: 'IM019' },
            { lgaName: 'Orlu', lgaCode: 'IM020' },
            { lgaName: 'Orsu', lgaCode: 'IM021' },
            { lgaName: 'Oru East', lgaCode: 'IM022' },
            { lgaName: 'Oru West', lgaCode: 'IM023' },
            { lgaName: 'Owerri Municipal', lgaCode: 'IM024' },
            { lgaName: 'Owerri North', lgaCode: 'IM025' },
            { lgaName: 'Owerri West', lgaCode: 'IM026' },
            { lgaName: 'Unuimo', lgaCode: 'IM027' }
        ]
    },
    {
        state: 'Jigawa ',
        code: 'JI ',
        localGoverment: [
            { lgaName: 'Auyo', lgaCode: 'JI001' },
            { lgaName: 'Babura', lgaCode: 'JI002' },
            { lgaName: 'Biriniwa', lgaCode: 'JI003' },
            { lgaName: 'Birnin Kudu', lgaCode: 'JI004' },
            { lgaName: 'Buji', lgaCode: 'JI005' },
            { lgaName: 'Dutse', lgaCode: 'JI006' },
            { lgaName: 'Gagarawa', lgaCode: 'JI007' },
            { lgaName: 'Garki', lgaCode: 'JI008' },
            { lgaName: 'Gumel', lgaCode: 'JI009' },
            { lgaName: 'Guri', lgaCode: 'JI010' },
            { lgaName: 'Gwaram', lgaCode: 'JI011' },
            { lgaName: 'Gwiwa', lgaCode: 'JI012' },
            { lgaName: 'Hadejia', lgaCode: 'JI013' },
            { lgaName: 'Jahun', lgaCode: 'JI014' },
            { lgaName: 'Kafin Hausa', lgaCode: 'JI015' },
            { lgaName: 'Kaugama', lgaCode: 'JI016' },
            { lgaName: 'Kazaure', lgaCode: 'JI017' },
            { lgaName: 'Kiri Kasama', lgaCode: 'JI018' },
            { lgaName: 'Kiyawa', lgaCode: 'JI019' },
            { lgaName: 'Maigatari', lgaCode: 'JI020' },
            { lgaName: 'Malam Madori', lgaCode: 'JI021' },
            { lgaName: 'Miga', lgaCode: 'JI022' },
            { lgaName: 'Ringim', lgaCode: 'JI023' },
            { lgaName: 'Roni', lgaCode: 'JI024' },
            { lgaName: 'Sule Tankarkar', lgaCode: 'JI025' },
            { lgaName: 'Taura', lgaCode: 'JI026' },
            { lgaName: 'Yankwashi', lgaCode: 'JI027' }
        ]
    },
    {
        state: 'Kaduna ',
        code: 'KD ',
        localGoverment: [
            { lgaName: 'Birnin Gwari', lgaCode: 'KD001' },
            { lgaName: 'Chikun', lgaCode: 'KD002' },
            { lgaName: 'Giwa', lgaCode: 'KD003' },
            { lgaName: 'Igabi', lgaCode: 'KD004' },
            { lgaName: 'Ikara', lgaCode: 'KD005' },
            { lgaName: 'Jaba', lgaCode: 'KD006' },
            { lgaName: "Jema'a", lgaCode: 'KD007' },
            { lgaName: 'Kachia', lgaCode: 'KD008' },
            { lgaName: 'Kaduna North', lgaCode: 'KD009' },
            { lgaName: 'Kaduna South', lgaCode: 'KD010' },
            { lgaName: 'Kagarko', lgaCode: 'KD011' },
            { lgaName: 'Kajuru', lgaCode: 'KD012' },
            { lgaName: 'Kaura', lgaCode: 'KD013' },
            { lgaName: 'Kauru', lgaCode: 'KD014' },
            { lgaName: 'Kubau', lgaCode: 'KD015' },
            { lgaName: 'Kudan', lgaCode: 'KD016' },
            { lgaName: 'Lere', lgaCode: 'KD017' },
            { lgaName: 'Makarfi', lgaCode: 'KD018' },
            { lgaName: 'Sabon Gari', lgaCode: 'KD019' },
            { lgaName: 'Sanga', lgaCode: 'KD020' },
            { lgaName: 'Soba', lgaCode: 'KD021' },
            { lgaName: 'Zangon Kataf', lgaCode: 'KD022' },
            { lgaName: 'Zaria', lgaCode: 'KD023' }
        ]
    },
    {
        state: 'Kano ',
        code: 'KN ',
        localGoverment: [
            { lgaName: 'Ajingi', lgaCode: 'KN001' },
            { lgaName: 'Albasu', lgaCode: 'KN002' },
            { lgaName: 'Bagwai', lgaCode: 'KN003' },
            { lgaName: 'Bebeji', lgaCode: 'KN004' },
            { lgaName: 'Bichi', lgaCode: 'KN005' },
            { lgaName: 'Bunkure', lgaCode: 'KN006' },
            { lgaName: 'Dala', lgaCode: 'KN007' },
            { lgaName: 'Dambatta', lgaCode: 'KN008' },
            { lgaName: 'Dawakin Kudu', lgaCode: 'KN009' },
            { lgaName: 'Dawakin Tofa', lgaCode: 'KN010' },
            { lgaName: 'Doguwa', lgaCode: 'KN011' },
            { lgaName: 'Fagge', lgaCode: 'KN012' },
            { lgaName: 'Gabasawa', lgaCode: 'KN013' },
            { lgaName: 'Garko', lgaCode: 'KN014' },
            { lgaName: 'Garun Mallam', lgaCode: 'KN015' },
            { lgaName: 'Gaya', lgaCode: 'KN016' },
            { lgaName: 'Gezawa', lgaCode: 'KN017' },
            { lgaName: 'Gwale', lgaCode: 'KN018' },
            { lgaName: 'Gwarzo', lgaCode: 'KN019' },
            { lgaName: 'Kabo', lgaCode: 'KN020' },
            { lgaName: 'Kano Municipal', lgaCode: 'KN021' },
            { lgaName: 'Karaye', lgaCode: 'KN022' },
            { lgaName: 'Kibiya', lgaCode: 'KN023' },
            { lgaName: 'Kiru', lgaCode: 'KN024' },
            { lgaName: 'Kumbotso', lgaCode: 'KN025' },
            { lgaName: 'Kunchi', lgaCode: 'KN026' },
            { lgaName: 'Kura', lgaCode: 'KN027' },
            { lgaName: 'Madobi', lgaCode: 'KN028' },
            { lgaName: 'Makoda', lgaCode: 'KN029' },
            { lgaName: 'Minjibir', lgaCode: 'KN030' },
            { lgaName: 'Nasarawa', lgaCode: 'KN031' },
            { lgaName: 'Rano', lgaCode: 'KN032' },
            { lgaName: 'Rimin Gado', lgaCode: 'KN033' },
            { lgaName: 'Rogo', lgaCode: 'KN034' },
            { lgaName: 'Shanono', lgaCode: 'KN035' },
            { lgaName: 'Sumaila', lgaCode: 'KN036' },
            { lgaName: 'Takai', lgaCode: 'KN037' },
            { lgaName: 'Tarauni', lgaCode: 'KN038' },
            { lgaName: 'Tofa', lgaCode: 'KN039' },
            { lgaName: 'Tsanyawa', lgaCode: 'KN040' },
            { lgaName: 'Tudun Wada', lgaCode: 'KN041' },
            { lgaName: 'Ungogo', lgaCode: 'KN042' },
            { lgaName: 'Warawa', lgaCode: 'KN043' },
            { lgaName: 'Wudil', lgaCode: 'KN044' }
        ]
    },
    {
        state: 'Katsina ',
        code: 'KT ',
        localGoverment: [
            { lgaName: 'Bakori', lgaCode: 'KT001' },
            { lgaName: 'Batagarawa', lgaCode: 'KT002' },
            { lgaName: 'Batsari', lgaCode: 'KT003' },
            { lgaName: 'Baure', lgaCode: 'KT004' },
            { lgaName: 'Bindawa', lgaCode: 'KT005' },
            { lgaName: 'Charanchi', lgaCode: 'KT006' },
            { lgaName: 'Dandume', lgaCode: 'KT007' },
            { lgaName: 'Danja', lgaCode: 'KT008' },
            { lgaName: 'Dan Musa', lgaCode: 'KT009' },
            { lgaName: 'Daura', lgaCode: 'KT010' },
            { lgaName: 'Dutsi', lgaCode: 'KT011' },
            { lgaName: 'Dutsin Ma', lgaCode: 'KT012' },
            { lgaName: 'Faskari', lgaCode: 'KT013' },
            { lgaName: 'Funtua', lgaCode: 'KT014' },
            { lgaName: 'Ingawa', lgaCode: 'KT015' },
            { lgaName: 'Jibia', lgaCode: 'KT016' },
            { lgaName: 'Kafur', lgaCode: 'KT017' },
            { lgaName: 'Kaita', lgaCode: 'KT018' },
            { lgaName: 'Kankara', lgaCode: 'KT019' },
            { lgaName: 'Kankia', lgaCode: 'KT020' },
            { lgaName: 'Katsina', lgaCode: 'KT021' },
            { lgaName: 'Kurfi', lgaCode: 'KT022' },
            { lgaName: 'Kusada', lgaCode: 'KT023' },
            { lgaName: "Mai'Adua", lgaCode: 'KT024' },
            { lgaName: 'Malumfashi', lgaCode: 'KT025' },
            { lgaName: 'Mani', lgaCode: 'KT026' },
            { lgaName: 'Mashi', lgaCode: 'KT027' },
            { lgaName: 'Matazu', lgaCode: 'KT028' },
            { lgaName: 'Musawa', lgaCode: 'KT029' },
            { lgaName: 'Rimi', lgaCode: 'KT030' },
            { lgaName: 'Sabuwa', lgaCode: 'KT031' },
            { lgaName: 'Safana', lgaCode: 'KT032' },
            { lgaName: 'Sandamu', lgaCode: 'KT033' },
            { lgaName: 'Zango', lgaCode: 'KT034' }
        ]
    },
    {
        state: 'Kebbi ',
        code: 'KB ',
        localGoverment: [
            { lgaName: 'Aleiro', lgaCode: 'KB001' },
            { lgaName: 'Arewa', lgaCode: 'KB002' },
            { lgaName: 'Argungu', lgaCode: 'KB003' },
            { lgaName: 'Augie', lgaCode: 'KB004' },
            { lgaName: 'Bagudo', lgaCode: 'KB005' },
            { lgaName: 'Birnin Kebbi', lgaCode: 'KB006' },
            { lgaName: 'Bunza', lgaCode: 'KB007' },
            { lgaName: 'Dandi', lgaCode: 'KB008' },
            { lgaName: 'Fakai', lgaCode: 'KB009' },
            { lgaName: 'Gwandu', lgaCode: 'KB010' },
            { lgaName: 'Jega', lgaCode: 'KB011' },
            { lgaName: 'Kalgo', lgaCode: 'KB012' },
            { lgaName: 'Koko/Besse', lgaCode: 'KB013' },
            { lgaName: 'Maiyama', lgaCode: 'KB014' },
            { lgaName: 'Ngaski', lgaCode: 'KB015' },
            { lgaName: 'Sakaba', lgaCode: 'KB016' },
            { lgaName: 'Shanga', lgaCode: 'KB017' },
            { lgaName: 'Suru', lgaCode: 'KB018' },
            { lgaName: 'Danko-Wasagu', lgaCode: 'KB019' },
            { lgaName: 'Yauri', lgaCode: 'KB020' },
            { lgaName: 'Zuru', lgaCode: 'KB021' }
        ]
    },
    {
        state: 'Kogi ',
        code: 'KG ',
        localGoverment: [
            { lgaName: 'Adavi', lgaCode: 'KG001' },
            { lgaName: 'Ajaokuta', lgaCode: 'KG002' },
            { lgaName: 'Ankpa', lgaCode: 'KG003' },
            { lgaName: 'Bassa', lgaCode: 'KG004' },
            { lgaName: 'Dekina', lgaCode: 'KG005' },
            { lgaName: 'Ibaji', lgaCode: 'KG006' },
            { lgaName: 'Idah', lgaCode: 'KG007' },
            { lgaName: 'Igalamela Odolu', lgaCode: 'KG008' },
            { lgaName: 'Ijumu', lgaCode: 'KG009' },
            { lgaName: 'Kabba/Bunu', lgaCode: 'KG010' },
            { lgaName: 'Kogi', lgaCode: 'KG011' },
            { lgaName: 'Lokoja', lgaCode: 'KG012' },
            { lgaName: 'Mopa Muro', lgaCode: 'KG013' },
            { lgaName: 'Ofu', lgaCode: 'KG014' },
            { lgaName: 'Ogori/Magongo', lgaCode: 'KG015' },
            { lgaName: 'Okehi', lgaCode: 'KG016' },
            { lgaName: 'Okene', lgaCode: 'KG017' },
            { lgaName: 'Olamaboro', lgaCode: 'KG018' },
            { lgaName: 'Omala', lgaCode: 'KG019' },
            { lgaName: 'Yagba East', lgaCode: 'KG020' },
            { lgaName: 'Yagba West', lgaCode: 'KG021' }
        ]
    },
    {
        state: 'Kwara ',
        code: 'KW ',
        localGoverment: [
            { lgaName: 'Asa', lgaCode: 'KW001' },
            { lgaName: 'Baruten', lgaCode: 'KW002' },
            { lgaName: 'Edu', lgaCode: 'KW003' },
            { lgaName: 'Ekiti', lgaCode: 'KW004' },
            { lgaName: 'Ifelodun', lgaCode: 'KW005' },
            { lgaName: 'Ilorin East', lgaCode: 'KW006' },
            { lgaName: 'Ilorin South', lgaCode: 'KW007' },
            { lgaName: 'Ilorin West', lgaCode: 'KW008' },
            { lgaName: 'Irepodun', lgaCode: 'KW009' },
            { lgaName: 'Isin', lgaCode: 'KW010' },
            { lgaName: 'Kaiama', lgaCode: 'KW011' },
            { lgaName: 'Moro', lgaCode: 'KW012' },
            { lgaName: 'Offa', lgaCode: 'KW013' },
            { lgaName: 'Oke Ero', lgaCode: 'KW014' },
            { lgaName: 'Oyun', lgaCode: 'KW015' },
            { lgaName: 'Pategi', lgaCode: 'KW016' }
        ]
    },
    {
        state: 'Lagos ',
        code: 'LA ',
        localGoverment: [
            { lgaName: 'Agege', lgaCode: 'LA001' },
            { lgaName: 'Ajeromi-Ifelodun', lgaCode: 'LA002' },
            { lgaName: 'Alimosho', lgaCode: 'LA003' },
            { lgaName: 'Amuwo-Odofin', lgaCode: 'LA004' },
            { lgaName: 'Apapa', lgaCode: 'LA005' },
            { lgaName: 'Badagry', lgaCode: 'LA006' },
            { lgaName: 'Epe', lgaCode: 'LA007' },
            { lgaName: 'Eti Osa', lgaCode: 'LA008' },
            { lgaName: 'Ibeju-Lekki', lgaCode: 'LA009' },
            { lgaName: 'Ifako-Ijaiye', lgaCode: 'LA010' },
            { lgaName: 'Ikeja', lgaCode: 'LA011' },
            { lgaName: 'Ikorodu', lgaCode: 'LA012' },
            { lgaName: 'Kosofe', lgaCode: 'LA013' },
            { lgaName: 'Lagos Island', lgaCode: 'LA014' },
            { lgaName: 'Lagos Mainland', lgaCode: 'LA015' },
            { lgaName: 'Mushin', lgaCode: 'LA016' },
            { lgaName: 'Ojo', lgaCode: 'LA017' },
            { lgaName: 'Oshodi-Isolo', lgaCode: 'LA018' },
            { lgaName: 'Shomolu', lgaCode: 'LA019' },
            { lgaName: 'Surulere', lgaCode: 'LA020' }
        ]
    },
    {
        state: 'Nasarawa ',
        code: 'NA ',
        localGoverment: [
            { lgaName: 'Akwanga', lgaCode: 'NA001' },
            { lgaName: 'Awe', lgaCode: 'NA002' },
            { lgaName: 'Doma', lgaCode: 'NA003' },
            { lgaName: 'Karu', lgaCode: 'NA004' },
            { lgaName: 'Keana', lgaCode: 'NA005' },
            { lgaName: 'Keffi', lgaCode: 'NA006' },
            { lgaName: 'Kokona', lgaCode: 'NA007' },
            { lgaName: 'Lafia', lgaCode: 'NA008' },
            { lgaName: 'Nasarawa', lgaCode: 'NA009' },
            { lgaName: 'Nasarawa Egon', lgaCode: 'NA010' },
            { lgaName: 'Obi', lgaCode: 'NA011' },
            { lgaName: 'Toto', lgaCode: 'NA012' },
            { lgaName: 'Wamba', lgaCode: 'NA013' }
        ]
    },
    {
        state: 'Niger ',
        code: 'NG ',
        localGoverment: [
            { lgaName: 'Agaie', lgaCode: 'NG001' },
            { lgaName: 'Agwara', lgaCode: 'NG002' },
            { lgaName: 'Bida', lgaCode: 'NG003' },
            { lgaName: 'Borgu', lgaCode: 'NG004' },
            { lgaName: 'Bosso', lgaCode: 'NG005' },
            { lgaName: 'Chanchaga', lgaCode: 'NG006' },
            { lgaName: 'Edati', lgaCode: 'NG007' },
            { lgaName: 'Gbako', lgaCode: 'NG008' },
            { lgaName: 'Gurara', lgaCode: 'NG009' },
            { lgaName: 'Katcha', lgaCode: 'NG010' },
            { lgaName: 'Kontagora', lgaCode: 'NG011' },
            { lgaName: 'Lapai', lgaCode: 'NG012' },
            { lgaName: 'Lavun', lgaCode: 'NG013' },
            { lgaName: 'Magama', lgaCode: 'NG014' },
            { lgaName: 'Mariga', lgaCode: 'NG015' },
            { lgaName: 'Mashegu', lgaCode: 'NG016' },
            { lgaName: 'Mokwa', lgaCode: 'NG017' },
            { lgaName: 'Moya', lgaCode: 'NG018' },
            { lgaName: 'Paikoro', lgaCode: 'NG019' },
            { lgaName: 'Rafi', lgaCode: 'NG020' },
            { lgaName: 'Rijau', lgaCode: 'NG021' },
            { lgaName: 'Shiroro', lgaCode: 'NG022' },
            { lgaName: 'Suleja', lgaCode: 'NG023' },
            { lgaName: 'Tafa', lgaCode: 'NG024' },
            { lgaName: 'Wushishi', lgaCode: 'NG025' }
        ]
    },
    {
        state: 'Ogun ',
        code: 'OG ',
        localGoverment: [
            { lgaName: 'Abeokuta North', lgaCode: 'OG001' },
            { lgaName: 'Abeokuta South', lgaCode: 'OG002' },
            { lgaName: 'Ado-Odo/Ota', lgaCode: 'OG003' },
            { lgaName: 'Egbado North', lgaCode: 'OG004' },
            { lgaName: 'Egbado South', lgaCode: 'OG005' },
            { lgaName: 'Ewekoro', lgaCode: 'OG006' },
            { lgaName: 'Ifo', lgaCode: 'OG007' },
            { lgaName: 'Ijebu East', lgaCode: 'OG008' },
            { lgaName: 'Ijebu North', lgaCode: 'OG009' },
            { lgaName: 'Ijebu North East', lgaCode: 'OG010' },
            { lgaName: 'Ijebu Ode', lgaCode: 'OG011' },
            { lgaName: 'Ikenne', lgaCode: 'OG012' },
            { lgaName: 'Imeko Afon', lgaCode: 'OG013' },
            { lgaName: 'Ipokia', lgaCode: 'OG014' },
            { lgaName: 'Obafemi Owode', lgaCode: 'OG015' },
            { lgaName: 'Odeda', lgaCode: 'OG016' },
            { lgaName: 'Odogbolu', lgaCode: 'OG017' },
            { lgaName: 'Ogun Waterside', lgaCode: 'OG018' },
            { lgaName: 'Remo North', lgaCode: 'OG019' },
            { lgaName: 'Shagamu', lgaCode: 'OG020' }
        ]
    },
    {
        state: 'Ondo ',
        code: 'OD ',
        localGoverment: [
            { lgaName: 'Akoko North-East', lgaCode: 'OD001' },
            { lgaName: 'Akoko North-West', lgaCode: 'OD002' },
            { lgaName: 'Akoko South-East', lgaCode: 'OD003' },
            { lgaName: 'Akoko South-West', lgaCode: 'OD004' },
            { lgaName: 'Akure North', lgaCode: 'OD005' },
            { lgaName: 'Akure South', lgaCode: 'OD006' },
            { lgaName: 'Ese Odo', lgaCode: 'OD007' },
            { lgaName: 'Idanre', lgaCode: 'OD008' },
            { lgaName: 'Ifedore', lgaCode: 'OD009' },
            { lgaName: 'Ilaje', lgaCode: 'OD010' },
            { lgaName: 'Ile Oluji/Okeigbo', lgaCode: 'OD011' },
            { lgaName: 'Irele', lgaCode: 'OD012' },
            { lgaName: 'Odigbo', lgaCode: 'OD013' },
            { lgaName: 'Okitipupa', lgaCode: 'OD014' },
            { lgaName: 'Ondo West', lgaCode: 'OD015' },
            { lgaName: 'Ondo East', lgaCode: 'OD016' },
            { lgaName: 'Ose', lgaCode: 'OD017' },
            { lgaName: 'Owo', lgaCode: 'OD018' }
        ]
    },
    {
        state: 'Osun ',
        code: 'OS ',
        localGoverment: [
            { lgaName: 'Aiyedaade', lgaCode: 'OS001' },
            { lgaName: 'Atakunmosa East', lgaCode: 'OS002' },
            { lgaName: 'Atakunmosa West', lgaCode: 'OS003' },
            { lgaName: 'Boluwaduro', lgaCode: 'OS004' },
            { lgaName: 'Boripe', lgaCode: 'OS005' },
            { lgaName: 'Ede North', lgaCode: 'OS006' },
            { lgaName: 'Ede South', lgaCode: 'OS007' },
            { lgaName: 'Egbedore', lgaCode: 'OS008' },
            { lgaName: 'Ejigbo', lgaCode: 'OS009' },
            { lgaName: 'Gbonyin', lgaCode: 'OS0010' },
            { lgaName: 'Ife Central', lgaCode: 'OS011' },
            { lgaName: 'Ife East', lgaCode: 'OS012' },
            { lgaName: 'Ife North', lgaCode: 'OS013' },
            { lgaName: 'Ife South', lgaCode: 'OS014' },
            { lgaName: 'Ifedayo', lgaCode: 'OS015' },
            { lgaName: 'Ifelodun', lgaCode: 'OS016' },
            { lgaName: 'Ila', lgaCode: 'OS017' },
            { lgaName: 'Ilesa East', lgaCode: 'OS018' },
            { lgaName: 'Ilesa West', lgaCode: 'OS019' },
            { lgaName: 'Irepodun', lgaCode: 'OS020' },
            { lgaName: 'Irewole', lgaCode: 'OS021' },
            { lgaName: 'Isokan', lgaCode: 'OS022' },
            { lgaName: 'Iwo', lgaCode: 'OS023' },
            { lgaName: 'Obokun', lgaCode: 'OS024' },
            { lgaName: 'Odo Otin', lgaCode: 'OS025' },
            { lgaName: 'Ola Oluwa', lgaCode: 'OS026' },
            { lgaName: 'Olorunda', lgaCode: 'OS027' },
            { lgaName: 'Oriade', lgaCode: 'OS028' },
            { lgaName: 'Orolu', lgaCode: 'OS029' },
            { lgaName: 'Osogbo', lgaCode: 'OS030' }
        ]
    },
    {
        state: 'Oyo ',
        code: 'OY ',
        localGoverment: [
            { lgaName: 'Afijio', lgaCode: 'OY001' },
            { lgaName: 'Akinyele', lgaCode: 'OY002' },
            { lgaName: 'Atiba', lgaCode: 'OY003' },
            { lgaName: 'Atisbo', lgaCode: 'OY004' },
            { lgaName: 'Egbeda', lgaCode: 'OY005' },
            { lgaName: 'Ibadan North', lgaCode: 'OY006' },
            { lgaName: 'Ibadan North-East', lgaCode: 'OY007' },
            { lgaName: 'Ibadan North-West', lgaCode: 'OY008' },
            { lgaName: 'Ibadan South-East', lgaCode: 'OY009' },
            { lgaName: 'Ibadan South-West', lgaCode: 'OY010' },
            { lgaName: 'Ibarapa Central', lgaCode: 'OY011' },
            { lgaName: 'Ibarapa East', lgaCode: 'OY012' },
            { lgaName: 'Ibarapa North', lgaCode: 'OY013' },
            { lgaName: 'Ido', lgaCode: 'OY014' },
            { lgaName: 'Irepo', lgaCode: 'OY015' },
            { lgaName: 'Iseyin', lgaCode: 'OY016' },
            { lgaName: 'Itesiwaju', lgaCode: 'OY017' },
            { lgaName: 'Iwajowa', lgaCode: 'OY018' },
            { lgaName: 'Kajola', lgaCode: 'OY019' },
            { lgaName: 'Lagelu', lgaCode: 'OY020' },
            { lgaName: 'Ogbomosho North', lgaCode: 'OY021' },
            { lgaName: 'Ogbomosho South', lgaCode: 'OY022' },
            { lgaName: 'Ogo Oluwa', lgaCode: 'OY023' },
            { lgaName: 'Olorunsogo', lgaCode: 'OY024' },
            { lgaName: 'Oluyole', lgaCode: 'OY025' },
            { lgaName: 'Ona Ara', lgaCode: 'OY026' },
            { lgaName: 'Orelope', lgaCode: 'OY027' },
            { lgaName: 'Ori Ire', lgaCode: 'OY028' },
            { lgaName: 'Oyo East', lgaCode: 'OY029' },
            { lgaName: 'Oyo West', lgaCode: 'OY030' },
            { lgaName: 'Saki East', lgaCode: 'OY031' },
            { lgaName: 'Saki West', lgaCode: 'OY032' },
            { lgaName: 'Surulere', lgaCode: 'OY033' }
        ]
    },
    {
        state: 'Plateau ',
        code: 'PL ',
        localGoverment: [
            { lgaName: 'Barkin Ladi', lgaCode: 'PL001' },
            { lgaName: 'Bassa', lgaCode: 'PL002' },
            { lgaName: 'Bokkos', lgaCode: 'PL003' },
            { lgaName: 'Jos East', lgaCode: 'PL004' },
            { lgaName: 'Jos North', lgaCode: 'PL005' },
            { lgaName: 'Jos South', lgaCode: 'PL006' },
            { lgaName: 'Kanam', lgaCode: 'PL007' },
            { lgaName: 'Kanke', lgaCode: 'PL008' },
            { lgaName: 'Langtang North', lgaCode: 'PL009' },
            { lgaName: 'Langtang South', lgaCode: 'PL010' },
            { lgaName: 'Mangu', lgaCode: 'PL011' },
            { lgaName: 'Mikang', lgaCode: 'PL012' },
            { lgaName: 'Pankshin', lgaCode: 'PL013' },
            { lgaName: "Qua'an Pan", lgaCode: 'PL014' },
            { lgaName: 'Riyom', lgaCode: 'PL015' },
            { lgaName: 'Shendam', lgaCode: 'PL016' },
            { lgaName: 'Wase', lgaCode: 'PL017' }
        ]
    },
    {
        state: 'Rivers ',
        code: 'RV ',
        localGoverment: [
            { lgaName: 'Abua/Odual', lgaCode: 'RV001' },
            { lgaName: 'Ahoada East', lgaCode: 'RV002' },
            { lgaName: 'Ahoada West', lgaCode: 'RV003' },
            { lgaName: 'Akuku-Toru', lgaCode: 'RV004' },
            { lgaName: 'Andoni', lgaCode: 'RV005' },
            { lgaName: 'Asari-Toru', lgaCode: 'RV006' },
            { lgaName: 'Bonny', lgaCode: 'RV007' },
            { lgaName: 'Degema', lgaCode: 'RV008' },
            { lgaName: 'Eleme', lgaCode: 'RV009' },
            { lgaName: 'Emuoha', lgaCode: 'RV010' },
            { lgaName: 'Etche', lgaCode: 'RV011' },
            { lgaName: 'Gokana', lgaCode: 'RV012' },
            { lgaName: 'Ikwerre', lgaCode: 'RV013' },
            { lgaName: 'Khana', lgaCode: 'RV014' },
            { lgaName: 'Obio/Akpor', lgaCode: 'RV015' },
            { lgaName: 'Ogba/Egbema/Ndoni', lgaCode: 'RV016' },
            { lgaName: 'Ogu/Bolo', lgaCode: 'RV017' },
            { lgaName: 'Okrika', lgaCode: 'RV018' },
            { lgaName: 'Omuma', lgaCode: 'RV019' },
            { lgaName: 'Opobo/Nkoro', lgaCode: 'RV020' },
            { lgaName: 'Oyigbo', lgaCode: 'RV021' },
            { lgaName: 'Port Harcourt', lgaCode: 'RV022' },
            { lgaName: 'Tai', lgaCode: 'RV023' }
        ]
    },
    {
        state: 'Sokoto ',
        code: 'SK ',
        localGoverment: [
            { lgaName: 'Binji', lgaCode: 'SK001' },
            { lgaName: 'Bodinga', lgaCode: 'SK002' },
            { lgaName: 'Dange Shuni', lgaCode: 'SK003' },
            { lgaName: 'Gada', lgaCode: 'SK004' },
            { lgaName: 'Goronyo', lgaCode: 'SK005' },
            { lgaName: 'Gudu', lgaCode: 'SK006' },
            { lgaName: 'Gwadabawa', lgaCode: 'SK007' },
            { lgaName: 'Illela', lgaCode: 'SK008' },
            { lgaName: 'Isa', lgaCode: 'SK009' },
            { lgaName: 'Kebbe', lgaCode: 'SK010' },
            { lgaName: 'Kware', lgaCode: 'SK011' },
            { lgaName: 'Rabah', lgaCode: 'SK012' },
            { lgaName: 'Sabon Birni', lgaCode: 'SK013' },
            { lgaName: 'Shagari', lgaCode: 'SK014' },
            { lgaName: 'Silame', lgaCode: 'SK015' },
            { lgaName: 'Sokoto North', lgaCode: 'SK016' },
            { lgaName: 'Sokoto South', lgaCode: 'SK017' },
            { lgaName: 'Tambuwal', lgaCode: 'SK018' },
            { lgaName: 'Tangaza', lgaCode: 'SK019' },
            { lgaName: 'Tureta', lgaCode: 'SK020' },
            { lgaName: 'Wamako', lgaCode: 'SK021' },
            { lgaName: 'Wurno', lgaCode: 'SK022' },
            { lgaName: 'Yabo', lgaCode: 'SK023' }
        ]
    },
    {
        state: 'Taraba ',
        code: 'TR ',
        localGoverment: [
            { lgaName: 'Ardo Kola', lgaCode: 'TR001' },
            { lgaName: 'Bali', lgaCode: 'TR002' },
            { lgaName: 'Donga', lgaCode: 'TR003' },
            { lgaName: 'Gashaka', lgaCode: 'TR004' },
            { lgaName: 'Gassol', lgaCode: 'TR005' },
            { lgaName: 'Ibi', lgaCode: 'TR006' },
            { lgaName: 'Jalingo', lgaCode: 'TR007' },
            { lgaName: 'Karim Lamido', lgaCode: 'TR008' },
            { lgaName: 'Kumi', lgaCode: 'TR009' },
            { lgaName: 'Lau', lgaCode: 'TR010' },
            { lgaName: 'Sardauna', lgaCode: 'TR011' },
            { lgaName: 'Takum', lgaCode: 'TR012' },
            { lgaName: 'Ussa', lgaCode: 'TR013' },
            { lgaName: 'Wukari', lgaCode: 'TR014' },
            { lgaName: 'Yorro', lgaCode: 'TR015' },
            { lgaName: 'Zing', lgaCode: 'TR016' }
        ]
    },
    {
        state: 'Yobe ',
        code: 'YB ',
        localGoverment: [
            { lgaName: 'Bade', lgaCode: 'YB001' },
            { lgaName: 'Bursari', lgaCode: 'YB002' },
            { lgaName: 'Damaturu', lgaCode: 'YB003' },
            { lgaName: 'Fika', lgaCode: 'YB004' },
            { lgaName: 'Fune', lgaCode: 'YB005' },
            { lgaName: 'Geidam', lgaCode: 'YB006' },
            { lgaName: 'Gujba', lgaCode: 'YB007' },
            { lgaName: 'Gulani', lgaCode: 'YB008' },
            { lgaName: 'Jakusko', lgaCode: 'YB009' },
            { lgaName: 'Karasuwa', lgaCode: 'YB010' },
            { lgaName: 'Machina', lgaCode: 'YB011' },
            { lgaName: 'Nangere', lgaCode: 'YB012' },
            { lgaName: 'Nguru', lgaCode: 'YB013' },
            { lgaName: 'Potiskum', lgaCode: 'YB014' },
            { lgaName: 'Tarmuwa', lgaCode: 'YB015' },
            { lgaName: 'Yunusari', lgaCode: 'YB016' },
            { lgaName: 'Yusufari', lgaCode: 'YB017' }
        ]
    },
    {
        state: 'Zamfara ',
        code: 'ZM ',
        localGoverment: [
            { lgaName: 'Anka', lgaCode: 'ZM001' },
            { lgaName: 'Bakura', lgaCode: 'ZM002' },
            { lgaName: 'Birnin Magaji/Kiyaw', lgaCode: 'ZM003' },
            { lgaName: 'Bukkuyum', lgaCode: 'ZM004' },
            { lgaName: 'Bungudu', lgaCode: 'ZM005' },
            { lgaName: 'Chafe', lgaCode: 'ZM006' },
            { lgaName: 'Gummi', lgaCode: 'ZM007' },
            { lgaName: 'Gusau', lgaCode: 'ZM008' },
            { lgaName: 'Kaura Namoda', lgaCode: 'ZM009' },
            { lgaName: 'Maradun', lgaCode: 'ZM010' },
            { lgaName: 'Maru', lgaCode: 'ZM011' },
            { lgaName: 'Shinkafi', lgaCode: 'ZM012' },
            { lgaName: 'Talata Mafara', lgaCode: 'ZM013' },
            { lgaName: 'Zurmi', lgaCode: 'ZM014' }
        ]
    },
    {
        state: 'Federal Capital Territory',
        code: 'FC',
        localGoverment: [
            { lgaName: 'Abaji', lgaCode: 'FC001' },
            { lgaName: 'Bwari', lgaCode: 'FC002' },
            { lgaName: 'Gwagwalada', lgaCode: 'FC003' },
            { lgaName: 'Kuje', lgaCode: 'FC004' },
            { lgaName: 'Kwali', lgaCode: 'FC005' },
            { lgaName: 'Abuja Municipal Area Council', lgaCode: 'FC006' }
        ]
    }
];
export const dateData = [
    {
        date: '28:12:2022',
        cash: '1000'
    },
    {
        date: '12:12:2022',
        cash: '1500'
    },
    {
        date: '13:12:2022',
        cash: '200'
    },
    {
        date: '21:12:2022',
        cash: '21000'
    },
    {
        date: '21:12:2022',
        cash: '2000'
    },
    {
        date: '21:12:2022',
        cash: '2000'
    }
];
