import { create } from 'zustand'

const dummyOffers = [
    {
        id: 1,
        brandName: "KFC",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/100px-KFC_logo.svg.png",
        code: "KH123",
        pin: "3562",
        pointsRequired: "200",
        startDate: "20-01-25",
        endDate: "20-02-25",
        description: "Get 20% off on your next order",
        percentage: 20,
        tierRequired: "silver",
        app: "app1"
    },
    {
        id: 2,
        brandName: "McDonald's",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/100px-McDonald%27s_Golden_Arches.svg.png",
        code: "KH124",
        pin: "3563",
        pointsRequired: "300",
        startDate: "20-01-25",
        endDate: "20-03-25",
        description: "Get 30% off on burger meals",
        percentage: 30,
        tierRequired: "gold",
        app: "app2"
    },
    {
        id: 3,
        brandName: "Pizza Hut",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Pizza_Hut_logo.svg/100px-Pizza_Hut_logo.svg.png",
        code: "KH125",
        pin: "3564",
        pointsRequired: "400",
        startDate: "20-01-25",
        endDate: "20-04-25",
        description: "Get 25% off on large pizzas",
        percentage: 25,
        tierRequired: "platinum",
        app: "app1"
    },
    {
        id: 4,
        brandName: "Starbucks",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/100px-Starbucks_Corporation_Logo_2011.svg.png",
        code: "KH126",
        pin: "3565",
        pointsRequired: "150",
        startDate: "20-01-25",
        endDate: "20-02-25",
        description: "Get 15% off on beverages",
        percentage: 15,
        tierRequired: "silver",
        app: "app2"
    },
    {
        id: 5,
        brandName: "Subway",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/100px-Subway_2016_logo.svg.png",
        code: "KH127",
        pin: "3566",
        pointsRequired: "250",
        startDate: "20-01-25",
        endDate: "20-03-25",
        description: "Get 20% off on footlong subs",
        percentage: 20,
        tierRequired: "gold",
        app: "app1"
    }
];

const dummyBrands = [
    {
        id: 1,
        name: "KFC",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/100px-KFC_logo.svg.png",
        code: "KH123",
        category: "Food",
        createdOn: "20-01-25",
        status: "Active"
    },
    {
        id: 2,
        name: "McDonald's",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/100px-McDonald%27s_Golden_Arches.svg.png",
        code: "KH124",
        category: "Food",
        createdOn: "20-01-25",
        status: "Active"
    },
    // Add more dummy brands...
];

const dummyCategories = [
    {
        id: 1,
        title: "Food",
        image: "/icons/food.svg",
        code: "KH123",
        description: "For Payment",
        createdOn: "20-01-25"
    },
    {
        id: 2,
        title: "Retail",
        image: "/icons/retail.svg",
        code: "KH124",
        description: "For Shopping",
        createdOn: "20-01-25"
    },
    // Add more dummy categories...
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
        name: "John White",
        customerId: "KH12345",
        email: "john.white@gmail.com",
        phone: "874362734",
        companyName: "Amazon",
        points: "2754",
        tier: "Gold",
        referralCode: "KH126587",
        segment: "High Value",
        joinDate: "2023-01-15",
        lastActive: "2024-01-20",
        totalSpent: 15420.50,
        lifetimePoints: 25400,
        preferences: {
            categories: ["Food", "Electronics"],
            communications: ["email", "sms"],
            favoriteStores: ["KFC", "Apple Store"]
        },
        familyMembers: [],
        tags: ["frequent-buyer", "early-adopter"],
        notes: "",
        status: "Active",
        kycVerified: true,
        referredBy: null,
        referralCount: 3,
        pointsHistory: [
            {
                date: "2024-01-20",
                points: 150,
                type: "Earned",
                source: "Purchase"
            }
        ]
    },
    {
        id: 2,
        name: "Sarah Brown",
        customerId: "KH12346",
        email: "sarah.brown@gmail.com",
        phone: "874362735",
        companyName: "Microsoft",
        points: "1500",
        tier: "Silver",
        referralCode: "KH126588"
    },
    {
        id: 3,
        name: "Mike Johnson",
        customerId: "KH12347",
        email: "mike.j@gmail.com",
        phone: "874362736",
        companyName: "Google",
        points: "3500",
        tier: "Platinum",
        referralCode: "KH126589"
    },
    {
        id: 4,
        name: "Emily Davis",
        customerId: "KH12348",
        email: "emily.d@gmail.com",
        phone: "874362737",
        companyName: "Apple",
        points: "2000",
        tier: "Gold",
        referralCode: "KH126590"
    },
    {
        id: 5,
        name: "Alex Wilson",
        customerId: "KH12349",
        email: "alex.w@gmail.com",
        phone: "874362738",
        companyName: "Netflix",
        points: "1000",
        tier: "Silver",
        referralCode: "KH126591"
    }
];

const dummyTiers = [
    {
        id: 1,
        name: "Silver",
        pointsRequired: 1000,
        benefits: [
            "10% discount on all purchases",
            "Free delivery on orders above $50",
            "Early access to sales"
        ],
        status: "Active"
    },
    {
        id: 2,
        name: "Gold",
        pointsRequired: 5000,
        benefits: [
            "15% discount on all purchases",
            "Free delivery on all orders",
            "Priority customer support",
            "Exclusive event invitations"
        ],
        status: "Active"
    },
    {
        id: 3,
        name: "Platinum",
        pointsRequired: 10000,
        benefits: [
            "20% discount on all purchases",
            "Free delivery and priority shipping",
            "24/7 VIP customer support",
            "Exclusive event invitations",
            "Birthday rewards"
        ],
        status: "Active"
    }
];

const dummyTransactions = [
    {
        id: 1,
        customerId: "KH12345",
        customerName: "John White",
        type: "Purchase",
        amount: 150.00,
        points: 150,
        status: "Completed",
        date: "2024-01-20",
        merchant: "KFC",
        description: "Food order"
    },
    {
        id: 2,
        customerId: "KH12346",
        customerName: "Sarah Brown",
        type: "Redemption",
        amount: 50.00,
        points: -50,
        status: "Completed",
        date: "2024-01-19",
        merchant: "McDonald's",
        description: "Discount redemption"
    },
    {
        id: 3,
        customerId: "KH12347",
        customerName: "Mike Johnson",
        type: "Refund",
        amount: 75.00,
        points: -75,
        status: "Pending",
        date: "2024-01-18",
        merchant: "Pizza Hut",
        description: "Order cancellation"
    }
];

const useStore = create((set) => ({
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

    isAuthenticated: false,
    login: (credentials) => {
        set({ isAuthenticated: true });
    },
    logout: () => {
        set({ isAuthenticated: false });
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