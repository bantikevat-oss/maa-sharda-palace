import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext(null)

export const SITE_DEFAULTS = {
  // Basic Info
  businessName: 'Hotel Maa Sharda Palace',
  phone: '9109103571',
  phone2: '8435965777',
  whatsapp: '9109103571',
  email: 'reservations@maashardapalace.com',
  address: 'Ujjain Indore Highway, Tirupati Vihar, Near Shani Mandir, Ujjain, MP 456010',
  tagline: 'Where Comfort Meets Tradition',
  bookingUrl: 'https://maashardapalaceujjain.com',
  instagram: 'https://www.instagram.com/hotelmaashardapalace',
  facebook: '',
  gmb: 'https://share.google/UylrKlDj6NrWH2iUb',
  gtmId: '',
  ga4Id: '',
  fbPixelId: '',
  adminUsername: 'admin',
  adminPassword: 'msp@admin2024',
  // Hotel specifics
  checkIn: '12:00 PM',
  checkOut: '10:00 AM',
  totalRooms: '65+',
  establishedYear: '2018',
  // Hero
  hero_badge: 'Near Navgrah Shani Mandir · Ujjain',
  hero_h1: 'Hotel Maa Sharda Palace',
  hero_tagline: 'Where Comfort Meets Tradition',
  hero_desc: 'Experience luxury in the heart of Ujjain — prime Indore Road location, indoor pool, and 3 grand banquet halls for every occasion.',
  // Stats (TrustBar)
  stat_rooms: '59',
  stat_guests: '25000',
  stat_experience: '6',
  stat_banquets: '3',
  // SEO — Homepage
  metaTitle: 'Hotel Maa Sharda Palace | Luxury Hotel in Ujjain',
  metaDescription: 'Book your stay at Hotel Maa Sharda Palace, Ujjain. Prime location on Indore Road near Navgrah Shani Mandir. 65+ rooms, indoor pool, 3 banquet halls. Call 9109103571.',
  metaKeywords: 'hotel ujjain, hotel near navgrah shani mandir, hotel indore road ujjain, banquet hall ujjain, hotel maa sharda palace',
  // SEO — per page
  seo_rooms: { title: 'Luxury Rooms | Hotel Maa Sharda Palace Ujjain', description: 'Choose from Deluxe, Super Deluxe, Executive & Super Executive rooms. Comfortable stays starting at ₹3000/night. Book now: 9109103571.' },
  seo_gallery: { title: 'Photo Gallery | Hotel Maa Sharda Palace Ujjain', description: 'Explore our luxury rooms, indoor swimming pool, banquet halls, lobby, and more. Visual tour of Hotel Maa Sharda Palace.' },
  seo_about: { title: 'About Us | Hotel Maa Sharda Palace Ujjain', description: 'Learn about Hotel Maa Sharda Palace — Ujjain\'s premier hotel on Indore Road. Our story, amenities, and commitment to excellence.' },
  seo_contact: { title: 'Contact Us | Hotel Maa Sharda Palace Ujjain', description: 'Contact Hotel Maa Sharda Palace. Phone: 9109103571. Address: Indore Rd, near Navgrah Shani Mandir, Ujjain.' },
  seo_pool: { title: 'Indoor Swimming Pool | Hotel Maa Sharda Palace Ujjain', description: 'Relax in our stunning indoor swimming pool with living green wall. Exclusive for hotel guests. Book your stay: 9109103571.' },
  seo_banquet: { title: 'Banquet Halls in Ujjain | Hotel Maa Sharda Palace', description: '3 grand banquet halls for weddings, conferences & events in Ujjain. Prime Indore Road location. Enquire: 9109103571.' },
  seo_faq: { title: 'FAQ | Hotel Maa Sharda Palace Ujjain', description: 'Frequently asked questions about Hotel Maa Sharda Palace — check-in time, room amenities, pool access, banquet booking and more.' },
  // Room config keys (editable via AdminRooms)
  room_deluxe_name: 'Superior Room',
  room_deluxe_price: '₹3,000',
  room_deluxe_desc: 'Comfortable and well-appointed room with warm wooden interiors and modern amenities for a relaxing stay.',
  room_deluxe_meal: 'Breakfast Available (Chargeable)',
  room_sdlx_name: 'Superior Deluxe Room',
  room_sdlx_price: '₹4,000',
  room_sdlx_desc: 'Upgraded comfort with premium furnishings, extra space, and enhanced amenities for a superior experience.',
  room_sdlx_meal: 'Breakfast Available (Chargeable)',
  room_exec_name: 'Executive Room',
  room_exec_price: '₹5,000',
  room_exec_desc: 'Spacious executive room with premium finishes, work desk, and luxury amenities for business and leisure.',
  room_exec_meal: 'Complimentary Breakfast Included',
  room_sexec_name: 'Executive Deluxe Room',
  room_sexec_price: '₹6,000',
  room_sexec_desc: 'Our finest room — coffered LED ceiling, lounge sofa, jacuzzi, and 5-star finishes throughout.',
  room_sexec_meal: 'Complimentary Breakfast & Evening Snacks',
  extra_rooms: [],
  // Images
  img_hero_bg: '/images/hotel_front.jpg',
  img_hero_bg_2: '/images/hotel_front_2.png',
  hero_slide_3: '/images/pool_indoor.jpg',
  hero_slide_4: '/images/hotel_corridor.jpg',
  banquet_video_url: '',
  video_start: 15,
  video_end: '',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Hotel+Maa+Sharda+Palace+Indore+Road+Ujjain+Madhya+Pradesh&t=m&z=16&ie=UTF8&iwloc=&output=embed',
  img_logo: '/images/logo.jpg',
  img_lobby: '/images/hotel_corridor.jpg',
  img_lobby_2: '/images/hotel_front.jpg',
  img_reception: '/images/reception.jpg',
  img_pool: '/images/pool_indoor.jpg',
  img_pool_2: '/images/pool_2.jpg',
  img_banquet_1: '/images/banquet_grand.jpg',
  img_banquet_2: '/images/banquet_2.jpg',
  img_room_deluxe: '/images/room_deluxe_new.jpg',
  img_room_super_deluxe: '/images/room_super_deluxe.jpg',
  img_room_executive: '/images/room_executive_suite.jpg',
  img_room_super_executive: '/images/room_executive_suite.jpg',
  // Content arrays (all editable)
  testimonials: [
    { id: 1, name: 'Rajesh Gupta', location: 'Indore', rating: 5, text: 'Exceptional stay! The indoor pool is stunning and the rooms are spotlessly clean. Very convenient location for temple visits.', date: 'March 2026' },
    { id: 2, name: 'Priya Sharma', location: 'Bhopal', rating: 5, text: 'We booked the banquet hall for our family function. The staff was incredibly helpful and the ambiance was perfect. Highly recommended!', date: 'February 2026' },
    { id: 3, name: 'Amit Verma', location: 'Ujjain', rating: 5, text: 'Best hotel on Indore Road. The Super Executive room felt like a 5-star experience. Will definitely come back.', date: 'January 2026' },
    { id: 4, name: 'Sunita Joshi', location: 'Ahmedabad', rating: 5, text: 'Stayed here during Mahakal Darshan trip. Proximity to temples is unbeatable. Rooms are luxurious and breakfast was great.', date: 'March 2026' },
  ],
  faq_items: [
    { q: 'What are the check-in and check-out times?', a: 'Check-in is at 12:00 PM and check-out is at 11:00 AM. Early check-in and late check-out are available upon request, subject to availability.' },
    { q: 'Is the swimming pool open to all guests?', a: 'Yes, our indoor swimming pool is exclusively available for hotel guests at no extra charge. Pool timings: 6:00 AM – 9:00 PM.' },
    { q: 'How many banquet halls do you have and what is the capacity?', a: 'We have 3 fully air-conditioned banquet halls suitable for weddings, conferences, and social events. Capacity ranges from 50 to 300+ guests. Contact us for customized event packages.' },
    { q: 'Is parking available at the hotel?', a: 'Yes, complimentary parking is available for all hotel guests within the hotel premises.' },
    { q: 'What room types are available?', a: 'We offer 4 room categories: Deluxe (₹3,000), Super Deluxe (₹4,000), Executive (₹5,000), and Super Executive (₹6,000) per night. All rates are subject to availability.' },
    { q: 'Is the hotel near Mahakal Temple?', a: 'We are located on Indore Road near Navgrah Shani Mandir. Mahakal Temple is approximately 3–4 km from our property, easily accessible by auto or taxi.' },
    { q: 'Do you offer room service?', a: 'Yes, 24/7 room service is available. Guests can order food and beverages from our in-house menu at any time.' },
    { q: 'Is WiFi available in rooms?', a: 'Yes, complimentary high-speed WiFi is available in all rooms and common areas throughout the hotel.' },
  ],
  why_cards: [
    { icon: '🏊', title: 'Indoor Swimming Pool', desc: 'Ujjain\'s finest indoor pool with living green wall — exclusive for guests.' },
    { icon: '🎪', title: '3 Grand Banquet Halls', desc: 'Perfect for weddings, conferences & events. Capacity up to 300 guests.' },
    { icon: '📍', title: 'Prime Location', desc: 'On Indore Road, steps from Navgrah Shani Mandir. Everything is accessible.' },
    { icon: '🛎️', title: '24/7 Room Service', desc: 'Round-the-clock service — food, beverages, and concierge support.' },
    { icon: '🅿️', title: 'Free Parking', desc: 'Complimentary secure parking for all hotel guests.' },
  ],
}

export function AdminProvider({ children, configKey }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [config, setConfig] = useState(SITE_DEFAULTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let localConfig = SITE_DEFAULTS
    try {
      const saved = localStorage.getItem(configKey)
      if (saved) localConfig = { ...SITE_DEFAULTS, ...JSON.parse(saved) }
    } catch (e) { console.warn('localStorage corrupted, using defaults') }
    setConfig(localConfig)

    fetch('/api/get-config.php')
      .then(r => r.json())
      .then(serverData => {
        if (serverData && Object.keys(serverData).length > 0) {
          const merged = { ...SITE_DEFAULTS, ...serverData }
          setConfig(merged)
          localStorage.setItem(configKey, JSON.stringify(merged))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))

    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') setIsAdmin(true)
  }, [configKey])

  const login = (username, password) => {
    const storedUser = config?.adminUsername || SITE_DEFAULTS.adminUsername
    const storedPass = config?.adminPassword || SITE_DEFAULTS.adminPassword
    if (username === storedUser && password === storedPass) {
      sessionStorage.setItem('admin_auth', 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('admin_auth')
    setIsAdmin(false)
  }

  const updateConfig = async (newConfig) => {
    const merged = { ...config, ...newConfig }
    localStorage.setItem(configKey, JSON.stringify(merged))
    setConfig(merged)
    try {
      await fetch('/api/save-config.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: merged })
      })
    } catch (e) { console.warn('Server save failed') }
  }

  return (
    <AdminContext.Provider value={{ isAdmin, config, loading, login, logout, updateConfig }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
