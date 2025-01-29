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

const useStore = create((set) => ({
    // Points Criteria State
    pointsCriteria: [],
    setPointsCriteria: (criteria) => set({ pointsCriteria: criteria }),
    addPointCriteria: (criteria) => set((state) => ({
        pointsCriteria: [...state.pointsCriteria, criteria]
    })),

    // Transactions State
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),

    // Customers State
    customers: [],
    setCustomers: (customers) => set({ customers }),

    // Apps State
    apps: [],
    setApps: (apps) => set({ apps }),

    // Categories State
    categories: [],
    setCategories: (categories) => set({ categories }),

    // Brands State
    brands: [],
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
    tiers: [],
    setTiers: (tiers) => set({ tiers }),

    updateOffer: (updatedOffer) =>
        set((state) => ({
            offers: state.offers.map((offer) =>
                offer.id === updatedOffer.id ? updatedOffer : offer
            ),
        })),
}))

export default useStore 