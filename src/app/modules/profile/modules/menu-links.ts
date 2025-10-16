export default {
    Admin: {
        icon: 'admin_panel_settings',
        label: 'Admin',
        appPermittedIf: 'Admin.Full',
        children: [
            {
                icon: 'Person',
                label: 'Dashboard'
            }
        ]
    },
    Profile: {
        icon: 'person',
        label: 'My Profile',
        appPermittedIf: 'Profile.Full',
        children: [
            {
                icon: 'Person',
                label: 'Dashboard',
                link: 'dashboard'
            }
        ]
    },
    Patient: {
        icon: 'personal_injury',
        label: 'For Patients',
        appPermittedIf: 'Patient.Full',
        children: [
            {
                icon: 'dashboard',
                label: 'Dashboard',
            },
            {
                icon: 'event_note',
                label: 'My Appointments',
            },
            {
                icon: 'history',
                label: 'Medical History',
            },
            {
                icon: 'local_pharmacy',
                label: 'Prescriptions',
            },
            {
                icon: 'receipt_long',
                label: 'Invoices & Payments',
            },
            {
                icon: 'feedback',
                label: 'Feedback',
            }
        ]
    },
    Doctor: {
        icon: 'medical_services',
        label: 'For Doctors',
        appPermittedIf: 'Doctor.Full',
        children: [
            {
                icon: 'dashboard',
                label: 'Dashboard'
            },
            {
                icon: 'people',
                label: 'My Patients'
            },
            {
                icon: 'event',
                label: 'Appointments'
            },
            {
                icon: 'note_add',
                label: 'Medical Records'

            },
            {
                icon: 'chat',
                label: 'Messages'
            },
            {
                icon: 'bar_chart',
                label: 'Statistics'
            }
        ]
    },
    HospitalOwner: {
        icon: 'local_hospital',
        label: 'Hospital Admin',
        appPermittedIf: 'HospitalOwner.Full',
        children: [
            {
                icon: 'dashboard',
                label: 'Dashboard'
            },
            {
                icon: 'groups',
                label: 'Doctors Management'
            },
            {
                icon: 'person_search',
                label: 'Patients Management'
            },
            {
                icon: 'event',
                label: 'Appointments'
            },
            {
                icon: 'insights',
                label: 'Analytics / Reports'
            },
            {
                icon: 'discount',
                label: 'Coupons / Discounts'
            },
            {
                icon: 'settings',
                label: 'Settings'
            }
        ]
    }
}