import { create } from 'zustand'

const dummyOffers = [
    {
        id: 1,
        brandName: "Bin Ateeq Restaurant",
        logo: "/brands/bin-ateeq.png",
        code: "KH123",
        pin: "3562",
        pointsRequired: "200",
        description: "Get 5 OMR off on traditional Omani feast",
        validUntil: "2024-02-01",
        status: "active"
    },
    {
        id: 2,
        brandName: "Lulu Hypermarket",
        logo: "/brands/lulu.png",
        pointsRequired: "300",
        description: "10% discount on fresh Omani dates and honey",
        validUntil: "2024-03-15",
        status: "active"
    },
    {
        id: 3,
        brandName: "Mutrah Souq",
        logo: "/brands/mutrah-souq.png",
        pointsRequired: "150",
        description: "15% off on authentic Omani silver jewelry",
        validUntil: "2024-02-28",
        status: "active"
    },
    {
        id: 4,
        brandName: "Bait Al Luban",
        logo: "/brands/bait-al-luban.png",
        pointsRequired: "250",
        description: "Complimentary Omani dessert platter with main course",
        validUntil: "2024-03-01",
        status: "active"
    },
    {
        id: 5,
        brandName: "Al Fair Markets",
        logo: "/brands/al-fair.png",
        pointsRequired: "175",
        description: "5% off on premium Arabic coffee and dates",
        validUntil: "2024-02-20",
        status: "active"
    }
];

const dummyBrands = [
    {
        id: 1,
        name: "Bin Ateeq Restaurant",
        category: "Restaurants",
        logo: "/brands/bin-ateeq.png",
        status: "active",
        locations: ["Ruwi", "Seeb", "Qurum", "Al Khuwair"]
    },
    {
        id: 2,
        name: "Lulu Hypermarket",
        category: "Grocery",
        logo: "/brands/lulu.png",
        status: "active",
        locations: ["Darsait", "Avenues Mall", "Bausher", "Al Khoud"]
    },
    {
        id: 3,
        name: "Bait Al Luban",
        category: "Restaurants",
        logo: "/brands/bait-al-luban.png",
        status: "active",
        locations: ["Muttrah Corniche", "Al Mouj"]
    },
    {
        id: 4,
        name: "Mutrah Souq",
        category: "Traditional Markets",
        logo: "/brands/mutrah-souq.png",
        status: "active",
        locations: ["Mutrah"]
    },
    {
        id: 5,
        name: "Al Angham",
        category: "Fine Dining",
        logo: "/brands/al-angham.png",
        status: "active",
        locations: ["Royal Opera House Muscat"]
    }
];

const dummyCategories = [
    {
        id: 1,
        title: "Food",
        description: "Authentic Omani and Gulf cuisine",
        status: "active",
        merchants: [
            "Bin Ateeq Restaurant",
            "Bait Al Luban",
            "Al Angham",
            "Ubhar Restaurant"
        ]
    },
    {
        id: 2,
        title: "Travel",
        description: "Traditional markets and modern retail",
        status: "active",
        merchants: [
            "Mutrah Souq",
            "Lulu Hypermarket",
            "Al Fair Markets",
            "Nizwa Souq"
        ]
    },
    {
        id: 3,
        title: "Leisure",
        description: "Traditional crafts and souvenirs",
        status: "active",
        merchants: [
            "National Handicraft Centre",
            "Omani Heritage Gallery",
            "Al Husn Souq",
            "Mutrah Silver Market"
        ]
    }
];

const dummyApps = [
    {
        id: 1,
        name: "Khedmah Mobile",
        icon: "/icons/mobile.svg",
        description: "Mobile application for customers",
        status: "Active"
    },
    {
        id: 2,
        name: "Khedmah Business",
        icon: "/icons/business.svg",
        description: "Business management application",
        status: "Active"
    },
    {
        id: 3,
        name: "Khedmah Merchant",
        icon: "/icons/merchant.svg",
        description: "Merchant portal application",
        status: "Inactive"
    }
];

const dummyCustomers = [
    {
        id: 1,
        name: "Ahmed Al-Balushi",
        email: "ahmed.balushi@email.com",
        phone: "+968 9123 4567",
        joinDate: "2023-12-01",
        points: 1250,
        tier: "gold",
        status: "active"
    },
    {
        id: 2,
        name: "Fatima Al-Lawati",
        email: "fatima.lawati@email.com",
        phone: "+968 9234 5678",
        joinDate: "2023-11-15",
        points: 850,
        tier: "silver",
        status: "active"
    },
    {
        id: 3,
        name: "Said Al-Harthi",
        email: "said.harthi@email.com",
        phone: "+968 9345 6789",
        joinDate: "2023-12-10",
        points: 2100,
        tier: "platinum",
        status: "active"
    }
];

const dummyTiers = [
    {
        id: 1,
        name: "Bronze",
        pointsRequired: 0,
        benefits: [
            "1 point per 1 OMR spent",
            "Birthday special offers",
            "Access to basic rewards"
        ],
        color: "#CD7F32"
    },
    {
        id: 2,
        name: "Silver",
        pointsRequired: 1000,
        benefits: [
            "1.5 points per 1 OMR spent",
            "Priority customer service",
            "Exclusive Ramadan offers"
        ],
        color: "#C0C0C0"
    },
    {
        id: 3,
        name: "Gold",
        pointsRequired: 2500,
        benefits: [
            "2 points per 1 OMR spent",
            "VIP parking at partner locations",
            "Early access to Eid promotions"
        ],
        color: "#FFD700"
    }
];

const dummyTransactions = [
    {
        id: "TXN001",
        customerId: 1,
        customerName: "Ahmed Al-Balushi",
        type: "purchase",
        amount: 35.500,
        points: 35,
        date: "2023-12-15",
        merchant: "Lulu Hypermarket",
        location: "Seeb",
        status: "completed",
        details: "Grocery and household items"
    },
    {
        id: "TXN002",
        customerId: 2,
        customerName: "Fatima Al-Lawati",
        type: "redemption",
        amount: 15.000,
        points: -150,
        date: "2023-12-14",
        merchant: "Bin Ateeq Restaurant",
        location: "Al Khuwair",
        status: "completed",
        details: "Traditional Omani feast"
    },
    {
        id: "TXN003",
        customerId: 3,
        customerName: "Said Al-Harthi",
        type: "purchase",
        amount: 25.750,
        points: 26,
        date: "2023-12-14",
        merchant: "Mutrah Souq",
        location: "Mutrah",
        status: "completed",
        details: "Traditional crafts and frankincense"
    },
    {
        id: "TXN004",
        customerId: 4,
        customerName: "Maryam Al-Busaidi",
        type: "purchase",
        amount: 42.000,
        points: 42,
        date: "2023-12-13",
        merchant: "Al Meera",
        location: "Qurum",
        status: "completed",
        details: "Monthly groceries"
    },
    {
        id: "TXN005",
        customerId: 5,
        customerName: "Khalid Al-Maskari",
        type: "redemption",
        amount: 20.000,
        points: -200,
        date: "2023-12-13",
        merchant: "Sablat Oman",
        location: "Al Ghubra",
        status: "completed",
        details: "Traditional coffee and dates set"
    }
];

const merchantOffers = [
    {
        id: 1,
        merchantName: "Bin Ateeq Restaurant",
        title: "Special Shuwa Feast",
        description: "Get 5 OMR off on traditional Shuwa meal for two",
        pointsRequired: 200,
        validUntil: "2024-02-01",
        location: "All branches",
        terms: "Valid on dine-in only"
    },
    {
        id: 2,
        merchantName: "Mutrah Souq Traders",
        title: "Frankincense Special",
        description: "15% discount on premium Omani frankincense",
        pointsRequired: 150,
        validUntil: "2024-02-15",
        location: "Mutrah Souq",
        terms: "Valid on purchases above 10 OMR"
    },
    {
        id: 3,
        merchantName: "Al Angham",
        title: "Royal Omani Dining",
        description: "Complimentary Arabic coffee and dates with any main course",
        pointsRequired: 300,
        validUntil: "2024-03-01",
        location: "Royal Opera House Muscat",
        terms: "Valid for dinner service only"
    },
    {
        id: 4,
        merchantName: "Nizwa Dates Market",
        title: "Premium Dates Bundle",
        description: "Special price on 1kg premium Khalas dates",
        pointsRequired: 175,
        validUntil: "2024-02-20",
        location: "Nizwa Souq",
        terms: "Subject to availability"
    },
    {
        id: 5,
        merchantName: "Al Hamra Trading",
        title: "Traditional Dishsdasha Offer",
        description: "10% off on premium Omani dishdasha",
        pointsRequired: 250,
        validUntil: "2024-02-28",
        location: "Ruwi High Street",
        terms: "Valid on selected styles"
    }
];

// Add role-based permissions
const rolePermissions = {
    admin: {
        points: {
            adjust: true,
            approve: true,
            approvalLimit: Infinity,
            bulkAdjust: true,
            viewAll: true,
        },
    },
    supervisor: {
        points: {
            adjust: true,
            approve: true,
            approvalLimit: 5000,
            bulkAdjust: false,
            viewAll: true,
        },
    },
    agent: {
        points: {
            adjust: true,
            approve: false,
            approvalLimit: 1000,
            bulkAdjust: false,
            viewAll: false,
        },
    },
};

const useStore = create((set, get) => ({
    // Points Criteria State
    pointsCriteria: [],
    setPointsCriteria: (criteria) => set({ pointsCriteria: criteria }),
    addPointCriteria: (criteria) => set((state) => ({
        pointsCriteria: [...state.pointsCriteria, criteria]
    })),

    // Transactions State
    transactions: dummyTransactions,
    setTransactions: (transactions) => set({ transactions }),
    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [
                { ...transaction, id: state.transactions.length + 1 },
                ...state.transactions
            ]
        })),
    updateTransaction: (updatedTransaction) =>
        set((state) => ({
            transactions: state.transactions.map((transaction) =>
                transaction.id === updatedTransaction.id ? updatedTransaction : transaction
            )
        })),

    // Customers State
    customers: dummyCustomers,
    setCustomers: (customers) => set({ customers }),
    addCustomer: (customer) =>
        set((state) => ({
            customers: [
                ...state.customers,
                {
                    ...customer,
                    id: state.customers.length + 1,
                    name: customer.email.split("@")[0],
                    customerId: `KH${Math.floor(Math.random() * 100000)}`,
                    tier: "Silver"
                }
            ]
        })),

    // Apps State
    apps: dummyApps,
    setApps: (apps) => set({ apps }),

    // Categories State
    categories: dummyCategories,
    setCategories: (categories) => set({ categories }),

    // Brands State
    brands: dummyBrands,
    setBrands: (brands) => set({ brands }),

    // Merchant Coupons State
    merchantCoupons: [],
    setMerchantCoupons: (coupons) => set({ merchantCoupons: coupons }),

    // Offers State
    offers: dummyOffers,
    addOffer: (offer) => set((state) => ({
        offers: [...state.offers, { ...offer, id: state.offers.length + 1 }]
    })),
    setOffers: (offers) => set({ offers }),

    // Tiers State
    tiers: dummyTiers,
    setTiers: (tiers) => set({ tiers }),
    addTier: (tier) =>
        set((state) => ({
            tiers: [
                ...state.tiers,
                { ...tier, id: state.tiers.length + 1 }
            ]
        })),
    updateTier: (updatedTier) =>
        set((state) => ({
            tiers: state.tiers.map((tier) =>
                tier.id === updatedTier.id ? updatedTier : tier
            )
        })),
    deleteTier: (tierId) =>
        set((state) => ({
            tiers: state.tiers.filter((tier) => tier.id !== tierId)
        })),

    updateOffer: (updatedOffer) =>
        set((state) => ({
            offers: state.offers.map((offer) =>
                offer.id === updatedOffer.id ? updatedOffer : offer
            ),
        })),

    deleteOffer: (offerId) =>
        set((state) => ({
            offers: state.offers.filter((offer) => offer.id !== offerId)
        })),

    bulkDeleteOffers: (offerIds) =>
        set((state) => ({
            offers: state.offers.filter((offer) => !offerIds.includes(offer.id))
        })),

    addBrand: (brand) =>
        set((state) => ({
            brands: [...state.brands, { ...brand, id: state.brands.length + 1 }]
        })),

    updateBrand: (updatedBrand) =>
        set((state) => ({
            brands: state.brands.map((brand) =>
                brand.id === updatedBrand.id ? updatedBrand : brand
            ),
        })),

    deleteBrand: (brandId) =>
        set((state) => ({
            brands: state.brands.filter((brand) => brand.id !== brandId)
        })),

    user: null,
    isAuthenticated: false,
    permissions: {
        points: {
            viewAll: false,
            approve: false,
            bulkAdjust: false,
            approvalLimit: 0,
        },
    },

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    setPermissions: (permissions) => set({ permissions }),

    logout: () => set({ user: null, isAuthenticated: false, permissions: {} }),

    // Helper function to check permissions
    checkPermission: (module, action) => {
        const permissions = get().permissions;
        return permissions?.[module]?.[action] || false;
    },

    login: (userData) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(userData));
        set({ isAuthenticated: true, user: userData });
    },

    deleteCustomer: (customerId) =>
        set((state) => ({
            customers: state.customers.filter((customer) => customer.id !== customerId)
        })),
    bulkDeleteCustomers: (customerIds) =>
        set((state) => ({
            customers: state.customers.filter((customer) => !customerIds.includes(customer.id))
        })),
    updateCustomer: (updatedCustomer) =>
        set((state) => ({
            customers: state.customers.map((customer) =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        })),
}))

export default useStore 