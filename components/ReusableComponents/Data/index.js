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
