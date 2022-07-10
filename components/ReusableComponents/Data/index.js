import MoreSvg from '../MoreSvg';
import PaymentSvg from '../PaymentSvg';
import SettingsSvg from '../SettingsSvg';
import SideBarHomeSvg from '../ShomeSvg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';

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
        icon: <PaymentSvg fillColor={false} />,
        iconActive: <PaymentSvg fillColor={true} />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />,
        subNavTitles: ['Receive Payment', 'Make Payment'],
        subNav: [
            {
                title: 'Paylink',
                path: '',
                icon: <BiIcons.BiLinkAlt />,
                subNavTitle: 'Receive Payment'
            },
            {
                title: 'USSD',
                path: '',
                icon: <FiIcons.FiHash />,
                subNavTitle: 'Receive Payment'
            },
            {
                title: 'Ecobank QR',
                path: '',
                icon: <BiIcons.BiScan />,
                subNavTitle: 'Receive Payment'
            },
            {
                title: 'mPOS',
                path: '',
                icon: <HiIcons.HiOutlineCreditCard />,
                subNavTitle: 'Receive Payment'
            },
            {
                title: 'Single Transfer',
                path: '',
                icon: <BiIcons.BiTransfer />,
                subNavTitle: 'Make Payment'
            },
            {
                title: 'Bulk Transfer',
                path: '',
                icon: '',
                subNavTitle: 'Make Payment'
            },
            {
                title: 'Bill Payment',
                path: '',
                icon: '',
                subNavTitle: 'Make Payment'
            },
            {
                title: 'FX Transfer',
                path: '',
                icon: <FaIcons.FaHandHoldingUsd />,
                subNavTitle: 'Make Payment'
            }
        ]
    },
    {
        title: 'Transactions',
        path: '/Transactions',
        icon: <CgIcons.CgMoreO />,
        iconClosed: <RiIcons.RiArrowDownSLine />,
        iconOpened: <RiIcons.RiArrowUpSLine />
    },

    {
        title: 'Tools',
        path: '/Tools',
        icon: <FiIcons.FiSettings />,
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
                icon: ''
            },
            {
                title: 'e invoice',
                path: '',
                icon: ''
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
