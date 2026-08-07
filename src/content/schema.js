/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENT MODEL — single source of truth for the whole website
 * ─────────────────────────────────────────────────────────────
 *
 *  Every piece of text, image, number, list and toggle that appears
 *  anywhere on the public site is declared here ONCE.
 *
 *  • The admin panel (/admin/pages) renders itself from this file —
 *    add a field here and it automatically appears in the admin UI.
 *  • The public pages read values through `useSite()` (hooks/useSite.js),
 *    which falls back to the `def` declared here when the client has
 *    not overridden it.
 *
 *  Field shape:
 *    k        unique config key (stored in api/site-config.json)
 *    label    what the client sees in the admin
 *    type     text | textarea | number | image | toggle | select | tags | list
 *    hint     small helper line under the label
 *    def      default value (what ships out of the box)
 *    rows     textarea rows
 *    options  select options  [{ value, label }]
 *    item     for type:'list' — the sub-fields of each row
 *    itemLabel  which sub-field to show as the row title
 *    addLabel   button text for adding a row
 *    full     render full-width in the admin grid
 *
 *  NOTE: `tags` = a simple list of strings, edited one-per-line.
 */

/* ══════════════════════════════════════════════════════════════
   Shared defaults reused in several places
   ══════════════════════════════════════════════════════════════ */

const WA_MSG = "Hi, I'd like to book a room at Hotel Maa Sharda Palace."

export const CONTENT_MODEL = [

  /* ═══════════════════════════════════════════════════════════
     GLOBAL — appears on every page
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'global',
    label: 'Global & Contact',
    icon: '🌐',
    path: '/',
    desc: 'Hotel name, phone numbers, address, logo, header menu and footer. Changing these updates every page at once.',
    sections: [
      {
        id: 'brand',
        label: 'Brand',
        hint: 'Hotel identity — used in the header, footer, browser tab and Google listing.',
        fields: [
          { k: 'businessName', label: 'Hotel Name', type: 'text', def: 'Hotel Maa Sharda Palace' },
          { k: 'tagline', label: 'Tagline', type: 'text', hint: 'Short one-liner shown under the hotel name', def: 'Where Comfort Meets Tradition' },
          { k: 'img_logo', label: 'Logo', type: 'image', hint: 'Shown in header, footer and favicon', def: '/images/logo.jpg' },
          { k: 'brand_city', label: 'City Label', type: 'text', hint: 'Small text under the logo (e.g. "Ujjain")', def: 'Ujjain' },
          { k: 'brand_region', label: 'Region Label (footer)', type: 'text', def: 'Ujjain, M.P.' },
          { k: 'establishedYear', label: 'Established Year', type: 'text', def: '2018' },
          { k: 'totalRooms', label: 'Total Rooms', type: 'text', def: '65+' },
        ],
      },
      {
        id: 'contact',
        label: 'Contact Details',
        hint: 'Used by every Call / WhatsApp / email button on the site.',
        fields: [
          { k: 'phone', label: 'Primary Phone', type: 'text', def: '9109103571' },
          { k: 'phone2', label: 'Secondary Phone', type: 'text', hint: 'Used for banquet / wedding enquiries', def: '8435965777' },
          { k: 'whatsapp', label: 'WhatsApp Number', type: 'text', def: '9109103571' },
          { k: 'whatsapp_message', label: 'Default WhatsApp Message', type: 'text', hint: 'Pre-filled text when a guest taps WhatsApp', def: WA_MSG },
          { k: 'email', label: 'Email', type: 'text', def: 'reservations@maashardapalace.com' },
          { k: 'address', label: 'Full Address', type: 'textarea', rows: 2, full: true, def: 'Ujjain Indore Highway, Tirupati Vihar, Near Shani Mandir, Ujjain, MP 456010' },
          { k: 'checkIn', label: 'Check-In Time', type: 'text', def: '12:00 PM' },
          { k: 'checkOut', label: 'Check-Out Time', type: 'text', def: '10:00 AM' },
          { k: 'bookingUrl', label: 'Book Now URL', type: 'text', hint: 'Where the "Book Now" button sends guests', def: 'https://maashardapalaceujjain.com' },
          { k: 'mapEmbedUrl', label: 'Google Maps Embed URL', type: 'textarea', rows: 2, full: true, def: 'https://maps.google.com/maps?q=Hotel+Maa+Sharda+Palace+Indore+Road+Ujjain+Madhya+Pradesh&t=m&z=16&ie=UTF8&iwloc=&output=embed' },
        ],
      },
      {
        id: 'social',
        label: 'Social Links',
        hint: 'Leave blank to hide an icon.',
        fields: [
          { k: 'instagram', label: 'Instagram URL', type: 'text', def: 'https://www.instagram.com/maashardapalace/' },
          { k: 'facebook', label: 'Facebook URL', type: 'text', def: 'https://www.facebook.com/share/17WU8kE2Ec/' },
          { k: 'gmb', label: 'Google Business / Maps URL', type: 'text', def: 'https://share.google/UylrKlDj6NrWH2iUb' },
        ],
      },
      {
        id: 'stats',
        label: 'Hotel Numbers',
        hint: 'The animated counters shown on the home page and About page.',
        fields: [
          {
            k: 'hotel_stats', label: 'Counters', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add counter',
            item: [
              { k: 'icon', label: 'Icon (emoji)', type: 'text' },
              { k: 'value', label: 'Number', type: 'text' },
              { k: 'suffix', label: 'Suffix', type: 'text', hint: 'e.g. +  ·  k+  ·  Yrs' },
              { k: 'label', label: 'Label', type: 'text' },
            ],
            def: [
              { icon: '🛏️', value: '59', suffix: '+', label: 'Rooms' },
              { icon: '🎪', value: '3', suffix: '', label: 'Banquet Halls' },
              { icon: '😊', value: '25', suffix: 'k+', label: 'Happy Guests' },
              { icon: '🏆', value: '6', suffix: ' Yrs', label: 'Of Excellence' },
            ],
          },
        ],
      },
      {
        id: 'header',
        label: 'Header & Menu',
        hint: 'The top bar, navigation menu and header buttons.',
        fields: [
          { k: 'show_header_topbar', label: 'Show top info bar', type: 'toggle', def: true },
          { k: 'header_tour_label', label: 'Top bar link text', type: 'text', def: 'Virtual Tour' },
          { k: 'header_tour_link', label: 'Top bar link URL', type: 'text', def: '/gallery' },
          { k: 'header_book_label', label: 'Book button text', type: 'text', def: '🏨 BOOK NOW' },
          { k: 'header_menu_subtitle', label: 'Mobile menu subtitle', type: 'text', def: 'Luxury Hotel · Ujjain' },
          { k: 'header_menu_location', label: 'Mobile menu location line', type: 'text', def: '📍 Ujjain Indore Road' },
          {
            k: 'nav_links', label: 'Navigation Menu', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add menu item',
            hint: 'Drag order with the arrows. Same menu is used on desktop and mobile.',
            item: [
              { k: 'label', label: 'Menu Label', type: 'text' },
              { k: 'to', label: 'Link', type: 'text', hint: 'e.g. /rooms' },
            ],
            def: [
              { label: 'Home', to: '/' },
              { label: 'About', to: '/about' },
              { label: 'Rooms', to: '/rooms' },
              { label: 'Dining', to: '/dining' },
              { label: 'Banquet', to: '/amenities/banquet' },
              { label: 'Wedding', to: '/wedding' },
              { label: 'Amenities', to: '/amenities' },
              { label: 'Ujjain Darshan', to: '/ujjain-darshan' },
              { label: 'Gallery', to: '/gallery' },
              { label: 'Contact', to: '/contact' },
            ],
          },
        ],
      },
      {
        id: 'footer',
        label: 'Footer',
        fields: [
          { k: 'footer_about', label: 'Footer About Line', type: 'textarea', rows: 2, full: true, def: 'Where Comfort Meets Tradition — Indoor pool & 3 grand banquet halls on Indore Road.' },
          { k: 'footer_links_title', label: 'Column 2 Heading', type: 'text', def: 'Quick Links' },
          {
            k: 'footer_quick_links', label: 'Quick Links', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add link',
            item: [
              { k: 'label', label: 'Label', type: 'text' },
              { k: 'to', label: 'Link', type: 'text' },
            ],
            def: [
              { label: 'Home', to: '/' }, { label: 'Rooms', to: '/rooms' }, { label: 'Dining', to: '/dining' },
              { label: 'Wedding', to: '/wedding' }, { label: 'Banquet Hall', to: '/amenities/banquet' },
              { label: 'Gallery', to: '/gallery' }, { label: 'About Us', to: '/about' },
              { label: 'FAQ', to: '/faq' }, { label: 'Blog', to: '/blog' }, { label: 'Contact', to: '/contact' },
            ],
          },
          { k: 'footer_amenities_title', label: 'Column 3 Heading', type: 'text', def: 'Amenities' },
          {
            k: 'footer_amenity_links', label: 'Amenity Links', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add link',
            item: [
              { k: 'label', label: 'Label', type: 'text' },
              { k: 'to', label: 'Link', type: 'text' },
            ],
            def: [
              { label: 'AC Rooms', to: '/rooms' },
              { label: 'Banquet Halls', to: '/amenities/banquet' },
              { label: 'Indoor Pool', to: '/amenities/pool' },
              { label: 'In-House Temple', to: '/amenities/mandir' },
              { label: 'Restaurant (Coming Soon)', to: '/dining' },
              { label: 'Gym', to: '/amenities/gym' },
            ],
          },
          { k: 'footer_contact_title', label: 'Column 4 Heading', type: 'text', def: 'Contact' },
          { k: 'footer_copyright', label: 'Copyright Line', type: 'text', full: true, hint: 'Use {year} for the current year and {name} for the hotel name', def: '© {year} {name}. All rights reserved.' },
        ],
      },
      {
        id: 'ctas',
        label: 'Floating & Mobile Buttons',
        fields: [
          { k: 'show_floating_cta', label: 'Show floating Call / WhatsApp bubbles', type: 'toggle', def: true },
          { k: 'show_mobile_bottom_cta', label: 'Show mobile bottom bar', type: 'toggle', def: true },
          { k: 'mobile_cta_call', label: 'Mobile bar — Call label', type: 'text', def: 'Call' },
          { k: 'mobile_cta_wa', label: 'Mobile bar — WhatsApp label', type: 'text', def: 'WhatsApp' },
          { k: 'mobile_cta_book', label: 'Mobile bar — Book label', type: 'text', def: 'Book Now' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     HOME
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'home',
    label: 'Home Page',
    icon: '🏠',
    path: '/',
    desc: 'Hero slider, counters, room strip, amenities, why-choose-us, reviews and the FAQ teaser.',
    sections: [
      {
        id: 'hero',
        label: 'Hero Slider',
        fields: [
          { k: 'hero_badge', label: 'Badge Text', type: 'text', full: true, def: 'Near Navgrah Shani Mandir · Ujjain' },
          { k: 'hero_h1', label: 'Main Headline', type: 'text', full: true, def: 'Hotel Maa Sharda Palace' },
          { k: 'hero_tagline', label: 'Sub-headline', type: 'text', full: true, def: 'Where Comfort Meets Tradition' },
          { k: 'hero_desc', label: 'Description', type: 'textarea', rows: 3, full: true, def: 'Experience luxury in the heart of Ujjain — prime Indore Road location, indoor pool, and 3 grand banquet halls for every occasion.' },
          { k: 'hero_cta_label', label: 'Primary Button Text', type: 'text', def: '🏨 Book Your Stay' },
          { k: 'hero_slide_seconds', label: 'Slide Duration (seconds)', type: 'number', def: 5 },
          { k: 'img_hero_bg', label: 'Slide 1', type: 'image', def: '/images/hero_slide_1.jpg' },
          { k: 'img_hero_bg_2', label: 'Slide 2', type: 'image', def: '/images/hero_slide_2.jpg' },
          { k: 'hero_slide_3', label: 'Slide 3', type: 'image', def: '/images/hero_slide_3.jpg' },
          { k: 'hero_slide_4', label: 'Slide 4', type: 'image', def: '/images/hero_slide_4.jpg' },
          {
            k: 'hero_features', label: 'Feature Chips', type: 'tags', full: true,
            hint: 'One per line. Shown as a row under the buttons.',
            def: ['✓ 59 Rooms', '✓ 3 Banquet Halls', '✓ Indoor Pool', '✓ Gym', '✓ Prime Location'],
          },
        ],
      },
      {
        id: 'trustbar',
        label: 'Counters Strip',
        hint: 'Numbers are edited in Global → Hotel Numbers.',
        fields: [
          { k: 'show_trustbar', label: 'Show this section', type: 'toggle', def: true },
        ],
      },
      {
        id: 'rooms',
        label: 'Rooms Strip',
        hint: 'The room cards themselves are edited in the Rooms page.',
        fields: [
          { k: 'show_home_rooms', label: 'Show this section', type: 'toggle', def: true },
          { k: 'home_rooms_eyebrow', label: 'Eyebrow', type: 'text', def: 'Accommodation' },
          { k: 'home_rooms_title', label: 'Heading', type: 'text', def: 'Rooms & Suites' },
          { k: 'home_rooms_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Thoughtfully designed rooms with modern comfort and warm hospitality.' },
          { k: 'home_rooms_cta', label: 'Button Text', type: 'text', def: 'View All Rooms →' },
        ],
      },
      {
        id: 'amenities_strip',
        label: 'Amenities Strip',
        fields: [
          { k: 'show_home_amenities', label: 'Show this section', type: 'toggle', def: true },
          {
            k: 'home_amenities', label: 'Amenity Chips', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add amenity',
            item: [
              { k: 'icon', label: 'Icon (emoji)', type: 'text' },
              { k: 'label', label: 'Label', type: 'text' },
              { k: 'link', label: 'Link (optional)', type: 'text', hint: 'Leave blank for plain text' },
            ],
            def: [
              { icon: '❄️', label: 'AC Rooms', link: '' },
              { icon: '🎪', label: 'Banquet Halls', link: '/amenities/banquet' },
              { icon: '🏊', label: 'Indoor Pool', link: '/amenities/pool' },
              { icon: '🍽️', label: 'Restaurant (Coming Soon)', link: '' },
              { icon: '💪', label: 'Gym', link: '/amenities' },
              { icon: '🅿️', label: 'Free Parking', link: '' },
              { icon: '📶', label: 'Free WiFi', link: '' },
              { icon: '🛎️', label: '24/7 Room Service', link: '' },
            ],
          },
        ],
      },
      {
        id: 'why',
        label: 'Why Choose Us',
        fields: [
          { k: 'show_why', label: 'Show this section', type: 'toggle', def: true },
          { k: 'why_eyebrow', label: 'Eyebrow', type: 'text', def: 'Why Choose Us' },
          { k: 'why_title', label: 'Heading', type: 'text', def: 'The Maa Sharda Experience' },
          { k: 'why_feature_img', label: 'Featured Image', type: 'image', def: '/images/pool_indoor.jpg' },
          { k: 'why_feature_icon', label: 'Featured Icon', type: 'text', def: '🏊' },
          { k: 'why_feature_title', label: 'Featured Title', type: 'text', def: 'Indoor Swimming Pool' },
          { k: 'why_feature_desc', label: 'Featured Description', type: 'textarea', rows: 2, full: true, def: "Ujjain's finest indoor pool with living green wall — a true resort experience in the city." },
          { k: 'why_feature_link_label', label: 'Featured Link Text', type: 'text', def: 'Exclusive for Guests →' },
          { k: 'why_feature_link', label: 'Featured Link URL', type: 'text', def: '/amenities/pool' },
          {
            k: 'why_cards', label: 'Feature Cards', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add card',
            item: [
              { k: 'icon', label: 'Icon (emoji)', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '🏊', title: 'Indoor Swimming Pool', desc: "Ujjain's finest indoor pool with living green wall — exclusive for guests." },
              { icon: '🎪', title: '3 Grand Banquet Halls', desc: 'Perfect for weddings, conferences & events. Capacity up to 300 guests.' },
              { icon: '📍', title: 'Prime Location', desc: 'On Indore Road, steps from Navgrah Shani Mandir. Everything is accessible.' },
              { icon: '🛎️', title: '24/7 Room Service', desc: 'Round-the-clock service — food, beverages, and concierge support.' },
              { icon: '🅿️', title: 'Free Parking', desc: 'Complimentary secure parking for all hotel guests.' },
            ],
          },
        ],
      },
      {
        id: 'testimonials',
        label: 'Guest Reviews',
        fields: [
          { k: 'show_testimonials', label: 'Show this section', type: 'toggle', def: true },
          { k: 'testimonials_eyebrow', label: 'Eyebrow', type: 'text', def: 'Guest Reviews' },
          { k: 'testimonials_title', label: 'Heading', type: 'text', def: 'What Our Guests Say' },
          { k: 'testimonials_cta', label: 'Button Text', type: 'text', def: '⭐ View All Reviews on Google' },
          {
            k: 'testimonials', label: 'Reviews', type: 'list', full: true, itemLabel: 'name', addLabel: 'Add review',
            item: [
              { k: 'name', label: 'Guest Name', type: 'text' },
              { k: 'location', label: 'City', type: 'text' },
              { k: 'rating', label: 'Stars (1–5)', type: 'number' },
              { k: 'date', label: 'Date', type: 'text' },
              { k: 'text', label: 'Review', type: 'textarea', rows: 3, full: true },
            ],
            def: [
              { id: 1, name: 'Rajesh Gupta', location: 'Indore', rating: 5, text: 'Exceptional stay! The indoor pool is stunning and the rooms are spotlessly clean. Very convenient location for temple visits.', date: 'March 2026' },
              { id: 2, name: 'Priya Sharma', location: 'Bhopal', rating: 5, text: 'We booked the banquet hall for our family function. The staff was incredibly helpful and the ambiance was perfect. Highly recommended!', date: 'February 2026' },
              { id: 3, name: 'Amit Verma', location: 'Ujjain', rating: 5, text: 'Best hotel on Indore Road. The Super Executive room felt like a 5-star experience. Will definitely come back.', date: 'January 2026' },
              { id: 4, name: 'Sunita Joshi', location: 'Ahmedabad', rating: 5, text: 'Stayed here during Mahakal Darshan trip. Proximity to temples is unbeatable. Rooms are luxurious and breakfast was great.', date: 'March 2026' },
            ],
          },
        ],
      },
      {
        id: 'home_faq',
        label: 'FAQ Teaser',
        hint: 'Shows the first 4 questions from the FAQ page.',
        fields: [
          { k: 'show_home_faq', label: 'Show this section', type: 'toggle', def: true },
          { k: 'home_faq_eyebrow', label: 'Eyebrow', type: 'text', def: 'FAQ' },
          { k: 'home_faq_title', label: 'Heading', type: 'text', def: 'Frequently Asked Questions' },
          { k: 'home_faq_cta', label: 'Link Text', type: 'text', def: 'View All FAQs →' },
        ],
      },
      {
        id: 'home_blog',
        label: 'Blog Teaser',
        fields: [
          { k: 'show_home_blog', label: 'Show this section', type: 'toggle', def: true },
          { k: 'home_blog_eyebrow', label: 'Eyebrow', type: 'text', def: 'Our Blog' },
          { k: 'home_blog_title', label: 'Heading', type: 'text', def: 'Travel Insights' },
          { k: 'home_blog_cta', label: 'Link Text', type: 'text', def: 'View All Posts →' },
        ],
      },
      {
        id: 'home_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'metaTitle', label: 'Page Title', type: 'text', full: true, def: 'Hotel Maa Sharda Palace | Luxury Hotel in Ujjain' },
          { k: 'metaDescription', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Book your stay at Hotel Maa Sharda Palace, Ujjain. Prime location on Indore Road near Navgrah Shani Mandir. 65+ rooms, indoor pool, 3 banquet halls. Call 9109103571.' },
          { k: 'metaKeywords', label: 'Keywords', type: 'text', full: true, def: 'hotel ujjain, hotel near navgrah shani mandir, hotel indore road ujjain, banquet hall ujjain, hotel maa sharda palace' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     ROOMS
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'rooms',
    label: 'Rooms',
    icon: '🛏️',
    path: '/rooms',
    desc: 'Every room type, its photos, price, features and detail page. Add or remove rooms freely.',
    sections: [
      {
        id: 'rooms_hero',
        label: 'Page Banner',
        fields: [
          { k: 'rooms_hero_title', label: 'Heading', type: 'text', def: 'Our Rooms' },
          { k: 'rooms_hero_img', label: 'Banner Image', type: 'image', def: '/images/room_executive.jpg' },
          { k: 'rooms_info_strip', label: 'Info Strip', type: 'tags', full: true, hint: 'One per line. Check-in / check-out are added automatically.', def: ['✅ Free Parking', '✅ Free WiFi', '✅ Pool Access'] },
        ],
      },
      {
        id: 'rooms_list',
        label: 'Room Types',
        hint: 'Each room automatically gets its own page at /rooms/<slug>.',
        fields: [
          {
            k: 'rooms', label: 'Rooms', type: 'list', full: true, itemLabel: 'name', addLabel: 'Add a room',
            item: [
              { k: 'name', label: 'Room Name', type: 'text' },
              { k: 'slug', label: 'URL Slug', type: 'text', hint: 'lowercase-with-dashes' },
              { k: 'price', label: 'Price', type: 'text' },
              { k: 'badge', label: 'Badge', type: 'text', hint: 'e.g. Best Value' },
              { k: 'tagline', label: 'Tagline', type: 'text', full: true },
              { k: 'size', label: 'Size', type: 'text' },
              { k: 'guests', label: 'Guests', type: 'text' },
              { k: 'bed', label: 'Bed', type: 'text' },
              { k: 'meal', label: 'Meal Plan', type: 'text', full: true },
              { k: 'desc', label: 'Short Description', type: 'textarea', rows: 2, full: true, hint: 'Shown on the rooms listing card' },
              { k: 'longDesc', label: 'Full Description', type: 'textarea', rows: 4, full: true, hint: 'Shown on the room detail page' },
              { k: 'features', label: 'Features', type: 'tags', full: true, hint: 'One per line' },
              { k: 'img', label: 'Main Photo', type: 'image' },
              { k: 'img2', label: 'Photo 2', type: 'image' },
              { k: 'img3', label: 'Photo 3', type: 'image' },
            ],
            def: [
              {
                slug: 'deluxe', name: 'Superior Room', price: '₹3,000', badge: 'Best Value',
                tagline: 'Comfortable Stay, Excellent Value', size: '28 m²', guests: '2 Adults', bed: 'King Bed',
                meal: 'Breakfast Available (Chargeable)',
                desc: 'Comfortable and well-appointed room with warm wooden interiors and modern amenities for a relaxing stay.',
                longDesc: 'Our Superior Rooms are designed for travellers who value comfort without compromise. Featuring a plush king-size bed, modern amenities, and a clean, well-appointed bathroom, these rooms are perfect for solo travellers and couples visiting Ujjain.',
                features: ['King Bed', 'Air Conditioning', 'Free WiFi', 'Hot Water', 'LCD TV', 'Room Service', 'Free Parking', 'Daily Housekeeping', 'Intercom', 'Smoke-Free Room'],
                img: '/images/room_deluxe.jpg', img2: '/images/room_deluxe_2.jpg', img3: '/images/room_deluxe_3.jpg',
              },
              {
                slug: 'super-deluxe', name: 'Superior Deluxe Room', price: '₹4,000', badge: 'Most Popular',
                tagline: 'More Space, More Comfort', size: '32 m²', guests: '2 Adults', bed: 'King Bed',
                meal: 'Breakfast Available (Chargeable)',
                desc: 'Upgraded comfort with premium furnishings, extra space, and enhanced amenities for a superior experience.',
                longDesc: 'Step up your stay with our Superior Deluxe Rooms — offering additional space, a mini fridge, dedicated work desk, and upgraded furnishings. Ideal for business travellers and families who need more room to breathe.',
                features: ['King Bed', 'Couch', 'Air Conditioning', 'Free WiFi', 'Hot Water', 'LCD TV', 'Room Service', 'Free Parking', 'Mini Fridge', 'Work Desk', 'Daily Housekeeping', 'Intercom', 'Tea/Coffee Maker'],
                img: '/images/room_super_deluxe.jpg', img2: '/images/room_super_deluxe_2.jpg', img3: '/images/room_super_deluxe_3.jpg',
              },
              {
                slug: 'executive', name: 'Executive Room', price: '₹5,000', badge: 'Premium',
                tagline: 'Premium Comfort, Thoughtful Touches', size: '38 m²', guests: '2 Adults', bed: 'King Bed',
                meal: 'Complimentary Breakfast Included',
                desc: 'Spacious executive room with premium finishes, work desk, and luxury amenities for business and leisure.',
                longDesc: 'Our Executive Rooms elevate your stay with a luxurious bathtub, 42" Smart TV, premium toiletries, and carefully curated decor. The perfect choice for guests who want a premium experience at a sensible price.',
                features: ['King Bed + Twin Bed', 'Air Conditioning', 'Free WiFi', 'Hot Water', '42" Smart TV', 'Room Service', 'Free Parking', 'Mini Fridge', 'Work Desk', 'Bathtub', 'Premium Toiletries', 'Daily Housekeeping', 'Bathrobe & Slippers'],
                img: '/images/room_executive.jpg', img2: '/images/room_executive_2.jpg', img3: '/images/room_executive_3.jpg',
              },
              {
                slug: 'super-executive', name: 'Executive Deluxe Room', price: '₹6,000', badge: 'Luxury',
                tagline: 'The Ultimate Luxury Experience', size: '48 m²', guests: '2 Adults + 1 Child', bed: 'King Bed',
                meal: 'Complimentary Breakfast & Evening Snacks',
                desc: 'Our finest room — coffered LED ceiling, lounge sofa, jacuzzi, and 5-star finishes throughout.',
                longDesc: 'Experience true luxury in our Executive Deluxe Rooms — the finest accommodation we offer. With a Jacuzzi, 55" Smart TV, private mini bar, and a separate living lounge area, this room redefines comfort in Ujjain. Perfect for honeymoons and special occasions.',
                features: ['King Bed + King Bed', 'Air Conditioning', 'Free WiFi', 'Hot Water', '55" Smart TV', 'Room Service', 'Free Parking', 'Mini Bar', 'Work Desk', 'Jacuzzi', 'Premium Toiletries', 'Living Lounge Area', 'Welcome Fruit Basket', 'Bathrobe & Slippers', 'Daily Housekeeping', 'Concierge Service'],
                img: '/images/room_super_executive.jpg', img2: '/images/room_super_executive_2.jpg', img3: '/images/room_super_executive_3.jpg',
              },
            ],
          },
        ],
      },
      {
        id: 'rooms_detail',
        label: 'Room Detail Pages',
        hint: 'Shared blocks that appear on every individual room page.',
        fields: [
          { k: 'room_gallery_title', label: 'Gallery Eyebrow', type: 'text', def: 'Photo Gallery' },
          { k: 'room_meal_note', label: 'Meal Plan Note', type: 'text', full: true, def: 'Contact us for customised meal arrangements.' },
          { k: 'room_policy_note', label: 'Policy Note', type: 'text', full: true, def: 'Early check-in and late check-out available on request, subject to availability.' },
          {
            k: 'room_policies', label: 'Hotel Policies', type: 'list', full: true, itemLabel: 'text', addLabel: 'Add policy',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'text', label: 'Policy', type: 'text', full: true },
            ],
            def: [
              { icon: '🚭', text: 'Non-smoking rooms available' },
              { icon: '🅿️', text: 'Complimentary parking' },
              { icon: '🪪', text: 'Valid ID required at check-in' },
              { icon: '💳', text: 'Cash & UPI accepted' },
            ],
          },
          {
            k: 'room_nearby', label: 'Nearby Attractions', type: 'list', full: true, itemLabel: 'place', addLabel: 'Add place',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'place', label: 'Place', type: 'text' },
              { k: 'dist', label: 'Distance', type: 'text' },
            ],
            def: [
              { icon: '🛕', place: 'Navgrah Shani Mandir', dist: 'Steps away' },
              { icon: '🛕', place: 'Mahakaleshwar Temple', dist: '~8 km' },
              { icon: '🛕', place: 'Kal Bhairav Temple', dist: '~15 km' },
              { icon: '🌊', place: 'Ram Ghat', dist: '~8 km' },
              { icon: '🚉', place: 'Ujjain Railway Station', dist: '~8.5 km' },
              { icon: '✈️', place: 'Indore Airport', dist: '~50 km' },
            ],
          },
          { k: 'room_booking_title', label: 'Booking Card Heading', type: 'text', full: true, def: '📞 Call for Best Rates' },
        ],
      },
      {
        id: 'rooms_cta',
        label: 'Bottom CTA',
        fields: [
          { k: 'rooms_cta_title', label: 'Heading', type: 'text', full: true, def: 'Need Help Choosing the Right Room?' },
          { k: 'rooms_cta_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Call us and our team will help you pick the best option for your budget and needs.' },
        ],
      },
      {
        id: 'rooms_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_rooms_title', label: 'Page Title', type: 'text', full: true, def: 'Luxury Rooms | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_rooms_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Choose from Superior, Superior Deluxe, Executive & Executive Deluxe rooms. Comfortable stays in Ujjain. Book now: 9109103571.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     ABOUT
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'about',
    label: 'About Page',
    icon: 'ℹ️',
    path: '/about',
    desc: 'Welcome text, story / mission / vision, why-choose-us, facilities and the promise section.',
    sections: [
      {
        id: 'about_hero',
        label: 'Page Banner',
        fields: [
          { k: 'about_hero_title', label: 'Heading', type: 'text', def: 'About Our Hotel' },
          { k: 'about_hero_img', label: 'Banner Image', type: 'image', def: '/images/hotel_front.jpg' },
        ],
      },
      {
        id: 'about_welcome',
        label: 'Welcome Section',
        fields: [
          { k: 'about_welcome_eyebrow', label: 'Eyebrow', type: 'text', def: 'Welcome' },
          { k: 'about_welcome_title', label: 'Heading', type: 'text', def: 'About Hotel Maa Sharda Palace' },
          { k: 'about_welcome_body', label: 'Body Text', type: 'textarea', rows: 8, full: true, hint: 'Leave a blank line between paragraphs.', def: 'Welcome to Hotel Maa Sharda Palace, where comfort, elegance, and warm hospitality come together to create unforgettable experiences. Located in the heart of Ujjain, Madhya Pradesh, our hotel offers the perfect blend of modern luxury and personalized service for business travelers, families, couples, and tourists.\n\nDesigned to provide a relaxing and memorable stay, our hotel features beautifully crafted rooms, premium amenities, exceptional dining experiences, and a peaceful atmosphere that makes every guest feel at home.\n\nWhether you are visiting for leisure, pilgrimage, business, or celebration, we are committed to delivering comfort, convenience, and hospitality at every step of your journey.' },
          { k: 'about_collage_1', label: 'Collage Image 1', type: 'image', def: '/images/hotel_front.jpg' },
          { k: 'about_collage_2', label: 'Collage Image 2', type: 'image', def: '/images/banquet_hall_1.jpg' },
          { k: 'about_collage_3', label: 'Collage Image 3', type: 'image', def: '/images/pool_indoor.jpg' },
          { k: 'about_collage_4', label: 'Collage Image 4', type: 'image', def: '/images/gym.jpg' },
        ],
      },
      {
        id: 'about_stats',
        label: 'Counters',
        hint: 'Numbers are edited in Global → Hotel Numbers.',
        fields: [
          { k: 'show_about_stats', label: 'Show this section', type: 'toggle', def: true },
        ],
      },
      {
        id: 'about_story',
        label: 'Story / Mission / Vision',
        fields: [
          { k: 'about_story_eyebrow', label: 'Eyebrow', type: 'text', def: 'Our Story' },
          { k: 'about_story_title', label: 'Heading', type: 'text', def: 'A Legacy of Warm Hospitality' },
          {
            k: 'about_story_cards', label: 'Cards', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add card',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'text', label: 'Text', type: 'textarea', rows: 4, full: true },
            ],
            def: [
              { icon: '📖', title: 'Our Story', text: 'Founded with a passion for hospitality, Hotel Maa Sharda Palace was created to offer guests a unique experience that combines luxury, comfort, and local culture. We have proudly welcomed travelers from around the world and built a reputation for exceptional service and unforgettable stays.' },
              { icon: '🎯', title: 'Our Mission', text: 'To provide outstanding hospitality through personalized service, comfortable accommodations, and memorable guest experiences. We create a welcoming environment where every guest feels valued, relaxed, and truly cared for at every step.' },
              { icon: '🌟', title: 'Our Vision', text: 'To become one of the most trusted and preferred hospitality destinations in Ujjain — known for excellence, comfort, and world-class guest satisfaction. A name guests remember and recommend with pride.' },
            ],
          },
        ],
      },
      {
        id: 'about_why',
        label: 'Why Choose Us',
        fields: [
          { k: 'about_why_eyebrow', label: 'Eyebrow', type: 'text', def: 'Why Us' },
          { k: 'about_why_title', label: 'Heading', type: 'text', def: 'Why Choose Us' },
          {
            k: 'about_why_items', label: 'Points', type: 'list', full: true, itemLabel: 'text', addLabel: 'Add point',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'text', label: 'Point', type: 'text', full: true },
            ],
            def: [
              { icon: '📍', text: 'Prime location near major attractions' },
              { icon: '🛏️', text: 'Elegant and comfortable rooms' },
              { icon: '🤝', text: 'Exceptional customer service' },
              { icon: '👨‍👩‍👧', text: 'Safe and family-friendly environment' },
              { icon: '✨', text: 'Modern amenities with traditional hospitality' },
              { icon: '💎', text: 'Affordable luxury and personalized experiences' },
            ],
          },
        ],
      },
      {
        id: 'about_facilities',
        label: 'Facilities',
        fields: [
          { k: 'about_fac_eyebrow', label: 'Eyebrow', type: 'text', def: 'Facilities' },
          { k: 'about_fac_title', label: 'Heading', type: 'text', def: 'Our Facilities' },
          { k: 'about_fac_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Guests can enjoy a wide range of modern facilities designed for comfort and convenience.' },
          {
            k: 'about_facilities', label: 'Facilities', type: 'list', full: true, itemLabel: 'text', addLabel: 'Add facility',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'text', label: 'Facility', type: 'text', full: true },
            ],
            def: [
              { icon: '❄️', text: 'AC Rooms' }, { icon: '🎪', text: 'Banquet Halls' },
              { icon: '🏊', text: 'Indoor Pool' }, { icon: '🍽️', text: 'Restaurant (Coming Soon)' },
              { icon: '💪', text: 'Gym' }, { icon: '🅿️', text: 'Free Parking' },
              { icon: '📶', text: 'Free WiFi' }, { icon: '🛎️', text: '24/7 Room Service' },
            ],
          },
        ],
      },
      {
        id: 'about_promise',
        label: 'Our Promise',
        fields: [
          { k: 'about_promise_img', label: 'Image', type: 'image', def: '/images/hotel_front.jpg' },
          { k: 'about_promise_eyebrow', label: 'Eyebrow', type: 'text', def: 'Our Promise' },
          { k: 'about_promise_title', label: 'Heading', type: 'text', def: 'Experience True Hospitality' },
          { k: 'about_promise_body', label: 'Body Text', type: 'textarea', rows: 7, full: true, hint: 'Leave a blank line between paragraphs.', def: 'Our dedicated team is committed to making your stay comfortable, peaceful, and memorable. From the moment you arrive until your departure, we focus on delivering exceptional service with warmth and professionalism.\n\nWe believe that every guest deserves more than just a stay — they deserve an experience filled with comfort, care, and lasting memories.\n\nWe are committed to responsible hospitality by adopting eco-friendly practices, sustainable operations, and community-focused initiatives to create a better future for our guests and environment.' },
        ],
      },
      {
        id: 'about_commit',
        label: 'Guest Commitment',
        fields: [
          { k: 'about_commit_icon', label: 'Icon', type: 'text', def: '🤝' },
          { k: 'about_commit_title', label: 'Heading', type: 'text', def: 'Our Guest Commitment' },
          { k: 'about_commit_body', label: 'Body Text', type: 'textarea', rows: 3, full: true, def: 'Your comfort, safety, and satisfaction are our highest priorities. We continuously work to exceed expectations and create memorable experiences that make guests return again and again.' },
          { k: 'about_commit_cta', label: 'Button Text', type: 'text', def: 'View Rooms' },
          { k: 'about_commit_cta_link', label: 'Button Link', type: 'text', def: '/rooms' },
        ],
      },
      {
        id: 'about_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_about_title', label: 'Page Title', type: 'text', full: true, def: 'About Us | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_about_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: "Learn about Hotel Maa Sharda Palace — Ujjain's premier hotel on Indore Road. Our story, amenities, and commitment to excellence." },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     GALLERY
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'gallery',
    label: 'Gallery',
    icon: '🖼️',
    path: '/gallery',
    desc: 'Every photo shown in the gallery, and the filter categories above them.',
    sections: [
      {
        id: 'gallery_hero',
        label: 'Page Banner',
        fields: [
          { k: 'gallery_hero_title', label: 'Heading', type: 'text', def: 'Photo Gallery' },
          { k: 'gallery_hero_img', label: 'Banner Image', type: 'image', def: '/images/hotel_corridor.jpg' },
        ],
      },
      {
        id: 'gallery_photos',
        label: 'Photos',
        fields: [
          { k: 'gallery_categories', label: 'Filter Categories', type: 'tags', full: true, hint: 'One per line. "All" is added automatically.', def: ['Rooms', 'Pool', 'Banquet', 'Lobby', 'Exterior'] },
          {
            k: 'gallery_photos', label: 'Photos', type: 'list', full: true, itemLabel: 'alt', addLabel: 'Add photo',
            item: [
              { k: 'src', label: 'Photo', type: 'image' },
              { k: 'alt', label: 'Caption', type: 'text' },
              { k: 'cat', label: 'Category', type: 'text', hint: 'Must match one of the categories above' },
            ],
            def: [
              { src: '/images/hotel_front.jpg', alt: 'Hotel Exterior', cat: 'Exterior' },
              { src: '/images/hero_bg_2.jpg', alt: 'Hotel Front View', cat: 'Exterior' },
              { src: '/images/hotel_corridor.jpg', alt: 'Hotel Corridor', cat: 'Lobby' },
              { src: '/images/lobby.jpg', alt: 'Hotel Lobby', cat: 'Lobby' },
              { src: '/images/reception_2.jpg', alt: 'Reception Area', cat: 'Lobby' },
              { src: '/images/room_deluxe_new.jpg', alt: 'Superior Room', cat: 'Rooms' },
              { src: '/images/room_deluxe.jpg', alt: 'Superior Room View', cat: 'Rooms' },
              { src: '/images/room_super_deluxe.jpg', alt: 'Superior Deluxe Room', cat: 'Rooms' },
              { src: '/images/room_super_deluxe_2.jpg', alt: 'Superior Deluxe View', cat: 'Rooms' },
              { src: '/images/room_executive_suite.jpg', alt: 'Executive Suite', cat: 'Rooms' },
              { src: '/images/room_executive.jpg', alt: 'Executive Room', cat: 'Rooms' },
              { src: '/images/room_super_executive_2.jpg', alt: 'Executive Deluxe View', cat: 'Rooms' },
              { src: '/images/room_super_executive_3.jpg', alt: 'Executive Deluxe Interior', cat: 'Rooms' },
              { src: '/images/pool_indoor.jpg', alt: 'Indoor Swimming Pool', cat: 'Pool' },
              { src: '/images/pool_4.jpg', alt: 'Pool Lounge', cat: 'Pool' },
              { src: '/images/banquet_hall_1.jpg', alt: 'Grand Banquet Hall', cat: 'Banquet' },
              { src: '/images/banquet_hall_2.jpg', alt: 'Banquet Hall', cat: 'Banquet' },
              { src: '/images/banquet_hall_3.jpg', alt: 'Banquet Setup', cat: 'Banquet' },
              { src: '/images/banquet_hall_4.jpg', alt: 'Banquet Decor', cat: 'Banquet' },
            ],
          },
        ],
      },
      {
        id: 'gallery_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_gallery_title', label: 'Page Title', type: 'text', full: true, def: 'Photo Gallery | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_gallery_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Explore our luxury rooms, indoor swimming pool, banquet halls, lobby, and more. Visual tour of Hotel Maa Sharda Palace.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     AMENITIES (hub)
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'amenities',
    label: 'Amenities Hub',
    icon: '✨',
    path: '/amenities',
    desc: 'The amenities overview page — facility rows, nearby temples and the wellness grid.',
    sections: [
      {
        id: 'am_hero',
        label: 'Page Banner',
        fields: [
          { k: 'am_hero_eyebrow', label: 'Eyebrow', type: 'text', def: 'Facilities' },
          { k: 'am_hero_title', label: 'Heading', type: 'text', def: 'Our Amenities' },
          { k: 'am_hero_desc', label: 'Sub-text', type: 'text', full: true, def: 'Everything you need for a comfortable stay' },
          { k: 'am_hero_img', label: 'Banner Image', type: 'image', def: '/images/pool_indoor.jpg' },
        ],
      },
      {
        id: 'am_items',
        label: 'Facility Rows',
        fields: [
          { k: 'am_items_eyebrow', label: 'Eyebrow', type: 'text', def: 'What We Offer' },
          { k: 'am_items_title', label: 'Heading', type: 'text', def: 'World-Class Facilities' },
          { k: 'am_items_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'At Hotel Maa Sharda Palace, guests can enjoy a wide range of modern facilities designed for comfort and convenience.' },
          {
            k: 'am_items', label: 'Facilities', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add facility',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'badge', label: 'Badge', type: 'text' },
              { k: 'timings', label: 'Timings', type: 'text', full: true },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 3, full: true },
              { k: 'highlights', label: 'Highlight Chips', type: 'tags', full: true, hint: 'One per line' },
              { k: 'main', label: 'Main Photo', type: 'image' },
              { k: 'thumb1', label: 'Thumbnail 1', type: 'image' },
              { k: 'thumb2', label: 'Thumbnail 2', type: 'image' },
              { k: 'link', label: 'Detail Page Link', type: 'text' },
            ],
            def: [
              {
                icon: '🏊', title: 'Indoor Swimming Pool', badge: 'Available',
                desc: 'Indoor temperature-controlled pool with a relaxing ambience. Perfect for guests of all ages. Morning & afternoon sessions available.',
                timings: 'Morning: 7–10 AM | Afternoon: 2–5 PM', link: '/amenities/pool',
                main: '/images/pool_indoor.jpg', thumb1: '/images/pool_2.jpg', thumb2: '/images/pool_3.jpg',
                highlights: ['💧 Temp Controlled', '👨‍👩‍👧 Family Friendly', '🛟 Lifeguard On Duty'],
              },
              {
                icon: '💪', title: 'Modern Gymnasium', badge: 'Coming Soon',
                desc: 'Fully equipped modern fitness centre with cardio and strength training equipment. Designed for guests who want to stay active during their stay.',
                timings: 'Morning: 6–10 AM | Evening: 4–8 PM', link: '/amenities/gym',
                main: '/images/gym.jpg', thumb1: '', thumb2: '',
                highlights: ['🏋️ Cardio + Strength', '❄️ Fully AC', '👨‍🏫 Trainer On Request'],
              },
              {
                icon: '🛕', title: 'In-House Temple (Mandir)', badge: 'Sacred Space',
                desc: 'A serene Shiv-Parvati temple within our premises, set against a tranquil Kailash backdrop. Guests can begin their day with peaceful darshan and seek blessings before heading out for Ujjain temple tours.',
                timings: 'Open daily for guest darshan', link: '/amenities/mandir',
                main: '/images/mandir_main.jpg', thumb1: '/images/mandir_deity.jpg', thumb2: '/images/mandir_2.jpg',
                highlights: ['🙏 Daily Aarti', '🕉️ Shiv-Parvati Darshan', '🧘 Peaceful Ambience'],
              },
            ],
          },
        ],
      },
      {
        id: 'am_temples',
        label: 'Nearby Temples',
        fields: [
          { k: 'show_am_temples', label: 'Show this section', type: 'toggle', def: true },
          { k: 'am_temples_eyebrow', label: 'Eyebrow', type: 'text', def: 'Spiritual Tourism' },
          { k: 'am_temples_title', label: 'Heading', type: 'text', def: 'Nearby Mandir & Temples' },
          { k: 'am_temples_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Ujjain — the spiritual capital of India. Explore sacred temples just a short drive from our hotel.' },
          { k: 'am_temples_cta', label: 'Button Text', type: 'text', def: 'Explore Ujjain Darshan' },
          {
            k: 'am_temples', label: 'Temples', type: 'list', full: true, itemLabel: 'name', addLabel: 'Add temple',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'name', label: 'Name', type: 'text' },
              { k: 'dist', label: 'Distance', type: 'text' },
              { k: 'img', label: 'Photo', type: 'image' },
            ],
            def: [
              { icon: '🛕', name: 'Navgrah Shani Mandir', dist: 'Steps Away', img: '/images/navgrah_shani.jpg' },
              { icon: '🕉️', name: 'Mahakaleshwar Temple', dist: '~8 km', img: '/images/mahakaleshwarr.jpg' },
              { icon: '🛕', name: 'Kal Bhairav Temple', dist: '~15 km', img: '/images/kal_bhairav.jpg' },
              { icon: '🌊', name: 'Ram Ghat (Shipra)', dist: '~8 km', img: '/images/mahakal_lok.jpg' },
              { icon: '🛕', name: 'Harsiddhi Mata Temple', dist: '~9 km', img: '/images/Harsiddhii.webp' },
              { icon: '🛕', name: 'Chintaman Ganesh', dist: '~10 km', img: '/images/chintaman_ganesh.webp' },
            ],
          },
        ],
      },
      {
        id: 'am_wellness',
        label: 'Wellness Grid',
        fields: [
          { k: 'show_am_wellness', label: 'Show this section', type: 'toggle', def: true },
          { k: 'am_wellness_title', label: 'Heading', type: 'text', def: 'Wellness at Maa Sharda Palace' },
          { k: 'am_wellness_desc', label: 'Sub-text', type: 'text', full: true, def: 'Your comfort and well-being is our priority' },
          {
            k: 'am_wellness', label: 'Items', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add item',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'label', label: 'Label', type: 'text' },
              { k: 'sub', label: 'Sub-label', type: 'text' },
            ],
            def: [
              { icon: '🏊', label: 'Indoor Pool', sub: 'Temp Controlled' },
              { icon: '💪', label: 'Gym', sub: 'Fully Equipped' },
              { icon: '🛕', label: 'In-House Temple', sub: 'Daily Aarti' },
              { icon: '🎪', label: 'Banquet Halls', sub: '3 Grand Halls' },
              { icon: '🛎️', label: 'Room Service', sub: '24/7 Availability' },
              { icon: '🅿️', label: 'Free Parking', sub: 'Secure & Spacious' },
            ],
          },
        ],
      },
      {
        id: 'am_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_amenities_title', label: 'Page Title', type: 'text', full: true, def: 'Amenities | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_amenities_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Explore amenities at Hotel Maa Sharda Palace — indoor swimming pool, gym and in-house temple for a comfortable stay in Ujjain.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     POOL
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'pool',
    label: 'Pool Page',
    icon: '🏊',
    path: '/amenities/pool',
    sections: [
      {
        id: 'pool_hero',
        label: 'Page Banner',
        fields: [
          { k: 'pool_eyebrow', label: 'Eyebrow', type: 'text', def: 'Wellness' },
          { k: 'pool_title', label: 'Heading', type: 'text', def: 'Indoor Swimming Pool' },
          { k: 'pool_subtitle', label: 'Sub-text', type: 'text', full: true, def: 'Relax · Rejuvenate · Recharge' },
        ],
      },
      {
        id: 'pool_intro',
        label: 'Intro & Timings',
        fields: [
          { k: 'pool_intro_eyebrow', label: 'Eyebrow', type: 'text', def: 'Exclusive for Guests' },
          { k: 'pool_intro_title', label: 'Heading', type: 'text', def: 'Relax & Rejuvenate at Our Pool' },
          { k: 'pool_intro_body', label: 'Body Text', type: 'textarea', rows: 4, full: true, def: 'Relax and rejuvenate at our tranquil swimming pool — an inviting space designed for leisure and comfort. Whether you prefer an energizing morning swim or a refreshing afternoon dip, our pool provides the perfect setting to unwind and recharge.' },
          { k: 'pool_timings_title', label: 'Timings Box Heading', type: 'text', def: '🕐 Pool Timings' },
          {
            k: 'pool_timings', label: 'Timings', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add timing',
            item: [
              { k: 'label', label: 'Label', type: 'text' },
              { k: 'value', label: 'Value', type: 'text' },
              { k: 'alert', label: 'Highlight in red', type: 'toggle' },
            ],
            def: [
              { label: '☀️ Morning', value: '07:00 AM – 10:00 AM', alert: false },
              { label: '🌤️ Afternoon', value: '02:00 PM – 05:00 PM', alert: false },
              { label: '🔴 Tuesday', value: 'Closed for Maintenance', alert: true },
            ],
          },
          { k: 'pool_cta_label', label: 'Button Text', type: 'text', full: true, def: 'Book a Room to Access Pool →' },
          { k: 'img_pool', label: 'Photo 1', type: 'image', def: '/images/pool_indoor.jpg' },
          { k: 'img_pool_2', label: 'Photo 2', type: 'image', def: '/images/pool_2.jpg' },
          { k: 'img_pool_3', label: 'Photo 3', type: 'image', def: '/images/pool_3.jpg' },
          { k: 'img_pool_4', label: 'Photo 4', type: 'image', def: '/images/pool_4.jpg' },
        ],
      },
      {
        id: 'pool_features',
        label: 'Features',
        fields: [
          { k: 'pool_features_title', label: 'Heading', type: 'text', full: true, def: 'Pool Features' },
          {
            k: 'pool_features', label: 'Features', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add feature',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '🌡️', title: 'Indoor Temperature-Controlled Pool', desc: 'Enjoy comfortable swimming in any season with our climate-controlled water temperature.' },
              { icon: '🛋️', title: 'Comfortable Lounge Area', desc: 'Relax and unwind at our poolside lounge with comfortable seating arrangements.' },
              { icon: '🌿', title: 'Peaceful & Relaxing Ambience', desc: 'A tranquil environment designed to help you disconnect and recharge completely.' },
            ],
          },
        ],
      },
      {
        id: 'pool_cta',
        label: 'Bottom CTA',
        fields: [
          { k: 'pool_bottom_title', label: 'Heading', type: 'text', full: true, def: 'Ready to Take a Dip?' },
          { k: 'pool_bottom_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Book any room and get complimentary pool access during your stay.' },
        ],
      },
      {
        id: 'pool_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_pool_title', label: 'Page Title', type: 'text', full: true, def: 'Indoor Swimming Pool | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_pool_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Relax in our stunning indoor swimming pool with living green wall. Exclusive for hotel guests. Book your stay: 9109103571.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     GYM
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'gym',
    label: 'Gym Page',
    icon: '💪',
    path: '/amenities/gym',
    sections: [
      {
        id: 'gym_hero',
        label: 'Page Banner',
        fields: [
          { k: 'gym_eyebrow', label: 'Eyebrow', type: 'text', def: 'Fitness' },
          { k: 'gym_title', label: 'Heading', type: 'text', def: 'Gymnasium — Coming Soon' },
          { k: 'gym_hero_img', label: 'Banner Image', type: 'image', def: '/images/gym.jpg' },
        ],
      },
      {
        id: 'gym_intro',
        label: 'Intro',
        fields: [
          { k: 'gym_badge', label: 'Badge', type: 'text', def: '💪 Opening Soon' },
          { k: 'gym_intro_title', label: 'Heading', type: 'text', def: 'A Modern Fitness Experience Arriving Soon' },
          { k: 'gym_intro_body', label: 'Body Text', type: 'textarea', rows: 4, full: true, def: 'A modern fitness experience is arriving soon at our property. Designed for both relaxation and performance, our upcoming gymnasium will feature advanced equipment and dedicated workout spaces to help you stay active and refreshed throughout your stay.' },
          { k: 'gym_intro_note', label: 'Note', type: 'text', full: true, def: 'Stay tuned as we prepare to launch a complete wellness and fitness experience.' },
          { k: 'gym_box_title', label: 'Highlight Box Title', type: 'text', def: '🚀 Coming Soon' },
          { k: 'gym_box_desc', label: 'Highlight Box Text', type: 'text', full: true, def: 'We are working hard to bring you the best fitness experience' },
        ],
      },
      {
        id: 'gym_gallery',
        label: 'Preview Gallery',
        fields: [
          { k: 'show_gym_gallery', label: 'Show this section', type: 'toggle', def: true },
          { k: 'gym_gallery_eyebrow', label: 'Eyebrow', type: 'text', def: 'Preview Glimpse' },
          { k: 'gym_gallery_title', label: 'Heading', type: 'text', def: 'A Look Into Our Upcoming Gym' },
          { k: 'gym_gallery_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Reference visuals of the modern fitness setup we are bringing to Hotel Maa Sharda Palace.' },
          {
            k: 'gym_gallery', label: 'Photos', type: 'list', full: true, itemLabel: 'alt', addLabel: 'Add photo',
            item: [
              { k: 'src', label: 'Photo', type: 'image' },
              { k: 'alt', label: 'Caption', type: 'text' },
            ],
            def: [
              { src: '/images/gym.jpg', alt: 'Gymnasium' },
            ],
          },
        ],
      },
      {
        id: 'gym_facilities',
        label: 'Planned Facilities',
        fields: [
          { k: 'gym_fac_eyebrow', label: 'Eyebrow', type: 'text', def: 'Preview' },
          { k: 'gym_fac_title', label: 'Heading', type: 'text', def: 'Planned Facilities' },
          {
            k: 'gym_facilities', label: 'Facilities', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add facility',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '🏋️', title: 'Modern Fitness Equipment', desc: 'Latest machines for strength and cardio training.' },
              { icon: '🚴', title: 'Dedicated Cardio Zone', desc: 'Treadmills, cycles and ellipticals.' },
              { icon: '👨‍🏫', title: 'Personal Training Support', desc: 'Expert trainers available on request.' },
              { icon: '❄️', title: 'Comfortable Workout Environment', desc: 'Fully AC with proper ventilation.' },
            ],
          },
        ],
      },
      {
        id: 'gym_hours',
        label: 'Expected Hours',
        fields: [
          { k: 'gym_hours_title', label: 'Heading', type: 'text', full: true, def: 'Expected Hours' },
          {
            k: 'gym_hours', label: 'Hours', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add slot',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'label', label: 'Label', type: 'text' },
              { k: 'value', label: 'Time', type: 'text' },
            ],
            def: [
              { icon: '☀️', label: 'Morning', value: '06:00 AM – 10:00 AM' },
              { icon: '🌙', label: 'Evening', value: '05:00 PM – 08:00 PM' },
            ],
          },
        ],
      },
      {
        id: 'gym_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_gym_title', label: 'Page Title', type: 'text', full: true, def: 'Gymnasium | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_gym_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Modern fitness centre coming soon at Hotel Maa Sharda Palace Ujjain.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     TEMPLE
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'temple',
    label: 'In-House Temple',
    icon: '🛕',
    path: '/amenities/mandir',
    sections: [
      {
        id: 'temple_hero',
        label: 'Page Banner',
        fields: [
          { k: 'temple_eyebrow', label: 'Eyebrow', type: 'text', def: 'Spiritual Space' },
          { k: 'temple_title', label: 'Heading', type: 'text', def: 'In-House Temple' },
          { k: 'temple_subtitle', label: 'Sub-text', type: 'text', full: true, def: 'Darshan · Shanti · Blessings' },
        ],
      },
      {
        id: 'temple_intro',
        label: 'Intro',
        fields: [
          { k: 'temple_intro_eyebrow', label: 'Eyebrow', type: 'text', def: 'Within Our Premises' },
          { k: 'temple_intro_title', label: 'Heading', type: 'text', def: 'Darshan at Our Sacred Mandir' },
          { k: 'temple_intro_body', label: 'Body Text', type: 'textarea', rows: 5, full: true, def: 'Set within the hotel premises, our serene Shiv-Parvati temple offers guests a peaceful space for prayer and reflection. With a beautiful Kailash backdrop and marble shrine, it is the perfect place to seek blessings before beginning your Ujjain temple tours — especially fitting for pilgrims visiting the nearby Navgrah Shani Mandir and Mahakaleshwar.' },
          { k: 'temple_cta_label', label: 'Button Text', type: 'text', full: true, def: '📞 Plan Your Spiritual Stay →' },
          { k: 'img_mandir', label: 'Photo 1', type: 'image', def: '/images/mandir_main.jpg' },
          { k: 'img_mandir_2', label: 'Photo 2', type: 'image', def: '/images/mandir_deity.jpg' },
          { k: 'img_mandir_3', label: 'Photo 3', type: 'image', def: '/images/mandir_2.jpg' },
        ],
      },
      {
        id: 'temple_features',
        label: 'Highlights',
        fields: [
          { k: 'temple_features_title', label: 'Heading', type: 'text', full: true, def: 'Temple Highlights' },
          {
            k: 'temple_features', label: 'Highlights', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add highlight',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '🕉️', title: 'Shiv-Parvati Shrine', desc: 'A beautifully adorned Shiv-Parvati murti set against a serene Kailash backdrop for daily darshan.' },
              { icon: '🙏', title: 'Daily Morning & Evening Aarti', desc: 'Start and end your day with peaceful aarti — open to all our guests during their stay.' },
              { icon: '🧘', title: 'Quiet & Peaceful Ambience', desc: 'A calm, sacred corner within the hotel where you can pause, pray, and find your centre.' },
            ],
          },
        ],
      },
      {
        id: 'temple_cta',
        label: 'Bottom CTA',
        fields: [
          { k: 'temple_bottom_title', label: 'Heading', type: 'text', full: true, def: 'A Blessed Start to Your Ujjain Yatra' },
          { k: 'temple_bottom_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Stay with us and enjoy darshan at our in-house temple, steps from Navgrah Shani Mandir.' },
        ],
      },
      {
        id: 'temple_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_mandir_title', label: 'Page Title', type: 'text', full: true, def: 'In-House Temple (Mandir) | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_mandir_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Begin your day with darshan at our serene in-house Shiv-Parvati temple. Daily morning & evening aarti for guests at Hotel Maa Sharda Palace, Ujjain.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     BANQUET
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'banquet',
    label: 'Banquet Hall',
    icon: '🎪',
    path: '/amenities/banquet',
    desc: 'Video hero, the three halls, facilities and the wedding highlight strip.',
    sections: [
      {
        id: 'bq_hero',
        label: 'Video Hero',
        fields: [
          { k: 'bq_video_id', label: 'YouTube Video ID', type: 'text', hint: 'Only the ID, e.g. 8IPnLZpV3CU. Leave blank to use an image instead.', def: '8IPnLZpV3CU' },
          { k: 'bq_video_start', label: 'Start At (seconds)', type: 'number', def: 35 },
          { k: 'bq_hero_img', label: 'Fallback Image', type: 'image', def: '/images/banquet_hall_1.jpg' },
          { k: 'bq_eyebrow', label: 'Eyebrow', type: 'text', def: 'Events & Celebrations' },
          { k: 'bq_title', label: 'Heading', type: 'text', def: 'Grand Banquet Hall' },
          { k: 'bq_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: '3 Grand Halls · Capacity up to 400 · Grand Stage · Premium Sound' },
          { k: 'bq_cta_label', label: 'Call Button Text', type: 'text', full: true, def: '📞 Book Banquet' },
        ],
      },
      {
        id: 'bq_halls',
        label: 'The Halls',
        fields: [
          {
            k: 'bq_halls', label: 'Halls', type: 'list', full: true, itemLabel: 'name', addLabel: 'Add hall',
            item: [
              { k: 'tag', label: 'Tag', type: 'text', hint: 'e.g. Hall 1' },
              { k: 'name', label: 'Hall Name', type: 'text' },
              { k: 'capacity', label: 'Capacity', type: 'text', full: true },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 3, full: true },
              { k: 'chips', label: 'Chips', type: 'tags', full: true, hint: 'One per line' },
              { k: 'img', label: 'Main Photo', type: 'image' },
              { k: 'img2', label: 'Photo 2', type: 'image' },
              { k: 'img3', label: 'Photo 3', type: 'image' },
            ],
            def: [
              {
                tag: 'Hall 1', name: 'Grand Banquet Hall', capacity: '350–400 Guests',
                desc: 'Our flagship grand hall — perfect for royal weddings, large receptions and major corporate events. Soaring ceilings, grand stage, and premium décor create an unforgettable atmosphere.',
                chips: ['👥 Capacity: 350–400 Guests', '🎪 Grand Stage', '🔊 Premium Sound'],
                img: '/images/banquet_hall_1.jpg', img2: '/images/banquet_hall_1_2.jpg', img3: '/images/banquet_hall_1_3.jpg',
              },
              {
                tag: 'Hall 2', name: 'Banquet Hall', capacity: '200–250 Guests',
                desc: 'Ideal for receptions, corporate conferences, anniversary celebrations and medium-scale events. Elegant interiors with flexible seating and top-notch AV equipment.',
                chips: ['👥 Capacity: 200–250 Guests', '❄️ Full AC', '🎤 Stage & Sound'],
                img: '/images/banquet_hall_2.jpg', img2: '/images/banquet_hall_2_2.jpg', img3: '/images/banquet_hall_2_3.jpg',
              },
              {
                tag: 'Hall 3', name: 'Intimate Hall', capacity: '100–150 Guests',
                desc: 'Perfect for intimate gatherings, birthday celebrations, kitty parties and small private functions. A cozy yet stylish space tailored to your vision.',
                chips: ['👥 Capacity: 100–150 Guests', '❄️ Full AC', '🎨 Custom Décor'],
                img: '/images/banquet_hall_3.jpg', img2: '/images/banquet_hall_3_2.jpg', img3: '',
              },
            ],
          },
        ],
      },
      {
        id: 'bq_features',
        label: 'What We Offer',
        fields: [
          { k: 'bq_features_eyebrow', label: 'Eyebrow', type: 'text', def: 'Facilities' },
          { k: 'bq_features_title', label: 'Heading', type: 'text', def: 'What We Offer' },
          {
            k: 'bq_features', label: 'Features', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add feature',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '🎨', title: 'Stylish Décor', desc: 'Elegant and customizable décor to match your vision and theme perfectly.' },
              { icon: '🎤', title: 'Grand Stage', desc: 'Professionally designed stage with premium lighting for your special moment.' },
              { icon: '🔊', title: 'Premium Sound', desc: 'State-of-the-art sound system ensuring crystal clear audio for all events.' },
              { icon: '❄️', title: 'Full AC', desc: 'Fully air-conditioned halls for a comfortable experience year-round.' },
              { icon: '🍽️', title: 'Catering Service', desc: 'Multi-cuisine catering with customizable menus for every occasion.' },
              { icon: '🅿️', title: 'Ample Parking', desc: 'Spacious parking area with valet parking service for your guests.' },
            ],
          },
        ],
      },
      {
        id: 'bq_wedding',
        label: 'Wedding Strip',
        fields: [
          { k: 'show_bq_wedding', label: 'Show this section', type: 'toggle', def: true },
          { k: 'bq_wedding_eyebrow', label: 'Eyebrow', type: 'text', def: 'Wedding Special' },
          { k: 'bq_wedding_title', label: 'Heading', type: 'text', def: 'Your Dream Wedding Awaits' },
          { k: 'bq_wedding_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Make your most special day truly unforgettable. Our dedicated wedding team handles every detail — from décor to catering — so you can enjoy every moment.' },
          {
            k: 'bq_wedding_services', label: 'Services', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add service',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'label', label: 'Label', type: 'text' },
            ],
            def: [
              { icon: '💍', label: 'Wedding Ceremony' }, { icon: '🎊', label: 'Reception' },
              { icon: '💃', label: 'Sangeet Night' }, { icon: '🌸', label: 'Mehendi Function' },
              { icon: '🍰', label: 'Cake Cutting' }, { icon: '📸', label: 'Photo Shoot' },
              { icon: '🎶', label: 'Live Music' }, { icon: '🕯️', label: 'Candle Décor' },
            ],
          },
        ],
      },
      {
        id: 'bq_cta',
        label: 'Bottom CTA',
        fields: [
          { k: 'bq_cta_title', label: 'Heading', type: 'text', full: true, def: 'Plan Your Special Event With Us' },
          { k: 'bq_cta_desc', label: 'Body Text', type: 'textarea', rows: 3, full: true, def: 'Our experienced event specialists will work closely with you to personalize every detail and bring your vision to life, creating a celebration that is truly unforgettable.' },
          { k: 'bq_cta_note', label: 'Note Above Buttons', type: 'text', full: true, def: 'Get in Touch With Our Events Team' },
        ],
      },
      {
        id: 'bq_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_banquet_title', label: 'Page Title', type: 'text', full: true, def: 'Banquet Halls in Ujjain | Hotel Maa Sharda Palace' },
          { k: 'seo_banquet_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: '3 grand banquet halls for weddings, conferences & events in Ujjain. Prime Indore Road location. Enquire: 8435965777.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     PARTY HALL
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'partyhall',
    label: 'Party Hall',
    icon: '🎉',
    path: '/amenities/party-hall',
    sections: [
      {
        id: 'ph_hero',
        label: 'Page Banner',
        fields: [
          { k: 'ph_eyebrow', label: 'Eyebrow', type: 'text', def: 'Celebrations' },
          { k: 'ph_title', label: 'Heading', type: 'text', def: 'Party Hall in Ujjain' },
          { k: 'ph_hero_img', label: 'Banner Image', type: 'image', def: '/images/banquet_hall_4.jpg' },
        ],
      },
      {
        id: 'ph_intro',
        label: 'Intro',
        fields: [
          { k: 'ph_intro_eyebrow', label: 'Eyebrow', type: 'text', def: 'Make it Special' },
          { k: 'ph_intro_title', label: 'Heading', type: 'text', def: 'Your Party, Our Perfect Venue' },
          { k: 'ph_intro_body', label: 'Body Text', type: 'textarea', rows: 6, full: true, hint: 'Leave a blank line between paragraphs.', def: "Celebrate life's best moments at our dedicated Party Hall. Whether it's a birthday bash, anniversary celebration, kitty party, or bachelor/bachelorette party — our venue sets the perfect stage.\n\nWith state-of-the-art sound systems, customizable lighting, in-house catering, and a dedicated event team, we handle every detail so you can focus on celebrating." },
          { k: 'ph_occasions', label: 'Occasions', type: 'tags', full: true, hint: 'One per line', def: ['🎂 Birthday Parties', '💍 Anniversaries', '👗 Kitty Parties', '🥂 Bachelor Parties', '🎓 Graduation Parties', '🏢 Office Parties', '👶 Baby Showers', '🎉 Get-togethers'] },
          { k: 'ph_side_img', label: 'Side Image', type: 'image', def: '/images/banquet_hall_1.jpg' },
        ],
      },
      {
        id: 'ph_included',
        label: "What's Included",
        fields: [
          { k: 'ph_included_title', label: 'Heading', type: 'text', full: true, def: "What's Included" },
          {
            k: 'ph_included', label: 'Items', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add item',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'label', label: 'Label', type: 'text' },
            ],
            def: [
              { icon: '🔊', label: 'DJ Sound System' }, { icon: '💡', label: 'Ambient Lighting' },
              { icon: '🍽️', label: 'Catering Service' }, { icon: '🅿️', label: 'Free Parking' },
              { icon: '❄️', label: 'Air Conditioning' }, { icon: '📸', label: 'Photo Area' },
              { icon: '🎤', label: 'Microphone' }, { icon: '👨‍💼', label: 'Event Staff' },
            ],
          },
        ],
      },
      {
        id: 'ph_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_party_title', label: 'Page Title', type: 'text', full: true, def: 'Party Hall in Ujjain | Hotel Maa Sharda Palace' },
          { k: 'seo_party_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Book our exclusive Party Hall for birthdays, kitty parties, bachelor parties & celebrations in Ujjain.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     DINING
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'dining',
    label: 'Dining',
    icon: '🍽️',
    path: '/dining',
    sections: [
      {
        id: 'dining_hero',
        label: 'Page Banner',
        fields: [
          { k: 'dining_eyebrow', label: 'Eyebrow', type: 'text', def: 'Restaurant' },
          { k: 'dining_title', label: 'Heading', type: 'text', def: 'Dining Experience' },
          { k: 'dining_hero_img', label: 'Banner Image', type: 'image', def: '/images/banquet_hall_2.jpg' },
        ],
      },
      {
        id: 'dining_intro',
        label: 'Intro',
        fields: [
          { k: 'dining_badge', label: 'Badge', type: 'text', def: '🍽️ Opening Soon' },
          { k: 'dining_intro_title', label: 'Heading', type: 'text', def: 'An Elevated Dining Experience — Arriving Soon' },
          { k: 'dining_intro_body', label: 'Body Text', type: 'textarea', rows: 4, full: true, def: 'Discover a refined culinary journey inspired by flavor, elegance, and exceptional hospitality. Our restaurant is set to redefine dining with exquisite cuisine, sophisticated interiors, and unforgettable experiences.' },
          { k: 'dining_intro_note', label: 'Note', type: 'text', full: true, def: 'Stay tuned for our grand opening.' },
        ],
      },
      {
        id: 'dining_gallery',
        label: 'Preview Gallery',
        fields: [
          { k: 'show_dining_gallery', label: 'Show this section', type: 'toggle', def: true },
          { k: 'dining_gallery_eyebrow', label: 'Eyebrow', type: 'text', def: 'Preview Glimpse' },
          { k: 'dining_gallery_title', label: 'Heading', type: 'text', def: 'A Look Into Our Upcoming Restaurant' },
          { k: 'dining_gallery_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Reference visuals of the refined dining experience we are bringing to Hotel Maa Sharda Palace.' },
          { k: 'dining_gallery_badge', label: 'Photo Badge', type: 'text', def: 'Coming Soon' },
          {
            k: 'dining_gallery', label: 'Photos', type: 'list', full: true, itemLabel: 'alt', addLabel: 'Add photo',
            item: [
              { k: 'src', label: 'Photo', type: 'image' },
              { k: 'alt', label: 'Caption', type: 'text' },
            ],
            def: [
              { src: '/images/banquet_hall_2.jpg', alt: 'Dining space view 1' },
              { src: '/images/banquet_hall_2_2.jpg', alt: 'Dining space view 2' },
              { src: '/images/banquet_hall_2_3.jpg', alt: 'Dining space view 3' },
            ],
          },
        ],
      },
      {
        id: 'dining_menu',
        label: 'What to Expect',
        fields: [
          { k: 'dining_menu_eyebrow', label: 'Eyebrow', type: 'text', def: 'Preview' },
          { k: 'dining_menu_title', label: 'Heading', type: 'text', def: 'What to Expect' },
          { k: 'dining_menu_desc', label: 'Sub-text', type: 'text', full: true, def: 'A glimpse of the culinary journey we are preparing for you' },
          {
            k: 'dining_menu', label: 'Cuisines', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add cuisine',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '🍛', title: 'North Indian Cuisine', desc: 'Rich curries, dal makhani, butter naan and authentic Mughal delicacies.' },
              { icon: '🥗', title: 'Continental Dishes', desc: 'Fresh salads, grilled specialties and international flavors.' },
              { icon: '🍜', title: 'South Indian', desc: 'Crispy dosas, idli sambhar and traditional South Indian breakfast.' },
              { icon: '🍰', title: 'Desserts & Sweets', desc: 'Gulab jamun, kheer, and a variety of Indian and continental desserts.' },
              { icon: '☕', title: 'Beverages', desc: 'Fresh juices, masala chai, cold drinks and welcome beverages.' },
              { icon: '🎂', title: 'Special Occasions', desc: 'Custom cakes and special menus for birthdays, anniversaries and events.' },
            ],
          },
        ],
      },
      {
        id: 'dining_features',
        label: 'Features Strip',
        fields: [
          {
            k: 'dining_features', label: 'Features', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add feature',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'label', label: 'Label', type: 'text' },
            ],
            def: [
              { icon: '🌿', label: 'Fresh Ingredients' }, { icon: '👨‍🍳', label: 'Expert Chefs' },
              { icon: '🏮', label: 'Elegant Ambience' }, { icon: '🛎️', label: 'Table Service' },
            ],
          },
        ],
      },
      {
        id: 'dining_cta',
        label: 'Bottom CTA',
        fields: [
          { k: 'dining_cta_title', label: 'Heading', type: 'text', full: true, def: 'Stay in Touch' },
          { k: 'dining_cta_desc', label: 'Body Text', type: 'textarea', rows: 2, full: true, def: 'Want to know when our restaurant opens? Call us or enquire at the reception and we will keep you updated.' },
          { k: 'dining_cta_btn', label: 'Contact Button Text', type: 'text', def: 'Contact Us' },
        ],
      },
      {
        id: 'dining_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_dining_title', label: 'Page Title', type: 'text', full: true, def: 'Dining | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_dining_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Experience an elevated dining experience at Hotel Maa Sharda Palace, Ujjain. Multi-cuisine restaurant coming soon.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     WEDDING
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'wedding',
    label: 'Wedding',
    icon: '💍',
    path: '/wedding',
    desc: 'The full wedding landing page — hero, services, venue, halls, gallery and couple reviews.',
    sections: [
      {
        id: 'wd_hero',
        label: 'Hero',
        fields: [
          { k: 'wd_hero_img', label: 'Hero Image', type: 'image', def: '/images/banquet_hall_1.jpg' },
          { k: 'wd_hero_label', label: 'Top Label', type: 'text', full: true, def: 'Hotel Maa Sharda Palace' },
          { k: 'wd_hero_title', label: 'Headline', type: 'text', full: true, hint: 'Wrap words in *asterisks* to highlight them in gold.', def: 'Your Dream *Wedding* Awaits' },
          { k: 'wd_hero_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Where every detail is crafted with love, every moment is made magical, and every celebration becomes a timeless memory.' },
          { k: 'wd_hero_cta', label: 'Primary Button Text', type: 'text', def: '📞 Plan Your Wedding' },
          { k: 'wd_hero_cta2', label: 'Secondary Button Text', type: 'text', def: 'View Gallery ↓' },
          {
            k: 'wd_stats', label: 'Stats Bar', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add stat',
            item: [
              { k: 'value', label: 'Value', type: 'text' },
              { k: 'label', label: 'Label', type: 'text' },
            ],
            def: [
              { value: '350–450', label: 'Guest Capacity' }, { value: '3+', label: 'Banquet Halls' },
              { value: '500+', label: 'Weddings Hosted' }, { value: '24/7', label: 'Event Support' },
            ],
          },
        ],
      },
      {
        id: 'wd_intro',
        label: 'Intro',
        fields: [
          { k: 'wd_intro_eyebrow', label: 'Eyebrow', type: 'text', def: 'Begin Your Forever' },
          { k: 'wd_intro_title', label: 'Heading', type: 'text', def: 'Celebrate Love at Maa Sharda Palace' },
          { k: 'wd_intro_body', label: 'Body Text', type: 'textarea', rows: 3, full: true, def: 'Our experienced event specialists work closely with you to personalize every detail and bring your vision to life — creating a celebration that is truly unforgettable. From intimate gatherings to grand royal celebrations, we make every wedding extraordinary.' },
        ],
      },
      {
        id: 'wd_why',
        label: 'Why Choose Us',
        fields: [
          { k: 'wd_why_eyebrow', label: 'Eyebrow', type: 'text', def: 'Why Choose Us' },
          { k: 'wd_why_title', label: 'Heading', type: 'text', def: 'The Perfect Wedding Venue' },
          {
            k: 'wd_why', label: 'Cards', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add card',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '🏛️', title: 'Grand Venue', desc: 'Spacious halls for 350–450 guests with majestic architecture & ambiance.' },
              { icon: '✨', title: 'Premium Décor', desc: 'Expert decorators bring your vision to life with luxury florals & drapes.' },
              { icon: '🍽️', title: 'Fine Catering', desc: 'Multi-cuisine menu by experienced chefs — Indian & continental spreads.' },
              { icon: '🎬', title: 'Grand Stage', desc: 'LED-lit stage with premium backdrops — every photo picture perfect.' },
              { icon: '🚘', title: 'Valet Parking', desc: 'Complimentary valet for all guests ensuring seamless arrivals.' },
              { icon: '🤝', title: 'Personal Coordinator', desc: 'Dedicated coordinator handling every detail so you enjoy your day.' },
            ],
          },
        ],
      },
      {
        id: 'wd_services',
        label: 'Wedding Highlights',
        fields: [
          { k: 'wd_services_eyebrow', label: 'Eyebrow', type: 'text', def: 'Curated for You' },
          { k: 'wd_services_title', label: 'Heading', type: 'text', def: 'Wedding Highlights' },
          { k: 'wd_services_desc', label: 'Sub-text', type: 'text', full: true, def: 'Every service crafted to perfection for your most special day' },
          {
            k: 'wd_services', label: 'Services', type: 'list', full: true, itemLabel: 'title', addLabel: 'Add service',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'title', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '💍', title: 'Grand Ceremony', desc: 'Floral mandap, traditional rituals & elegant décor for a perfect beginning.' },
              { icon: '🥂', title: 'Royal Reception', desc: 'Opulent evening with premium lighting, stage & live entertainment.' },
              { icon: '🎶', title: 'Sangeet Night', desc: 'Vibrant music, dance & laughter — memories crafted for a lifetime.' },
              { icon: '🌸', title: 'Mehendi Ceremony', desc: 'Beautifully decorated intimate setup with traditional floral ambience.' },
              { icon: '🎂', title: 'Wedding Cake', desc: 'Exquisite multi-tiered cakes as beautiful as your love story.' },
              { icon: '📸', title: 'Photo Shoot Setup', desc: 'Stunning backdrops & floral walls for breathtaking photographs.' },
              { icon: '🎵', title: 'Live Music & DJ', desc: 'Professional bands & DJs to keep your guests dancing all night.' },
              { icon: '🕯️', title: 'Candle & Floral Décor', desc: 'Rose petal paths & lush arrangements transforming every corner.' },
            ],
          },
        ],
      },
      {
        id: 'wd_venue',
        label: 'Venue Showcase',
        fields: [
          { k: 'wd_venue_eyebrow', label: 'Eyebrow', type: 'text', def: 'The Venue' },
          { k: 'wd_venue_title', label: 'Heading', type: 'text', def: 'A Hall Fit for Royalty' },
          { k: 'wd_venue_body', label: 'Body Text', type: 'textarea', rows: 4, full: true, def: 'Our grand banquet hall is designed to transform your wedding into an extraordinary experience. Soaring ceilings, premium acoustics, mood lighting and elegant architecture — every inch exudes luxury and sophistication.' },
          { k: 'wd_venue_img', label: 'Main Image', type: 'image', def: '/images/banquet_hall_1.jpg' },
          { k: 'wd_venue_img2', label: 'Inset Image', type: 'image', def: '/images/banquet_hall_3.jpg' },
          { k: 'wd_venue_rating', label: 'Rating Badge', type: 'text', def: '⭐ 5.0' },
          { k: 'wd_venue_rating_label', label: 'Rating Label', type: 'text', def: 'Couples Rating' },
          { k: 'wd_venue_count', label: 'Count Badge', type: 'text', def: '500+ Weddings' },
          { k: 'wd_venue_count_label', label: 'Count Label', type: 'text', def: 'Successfully Hosted' },
          {
            k: 'wd_venue_specs', label: 'Spec Grid', type: 'list', full: true, itemLabel: 'label', addLabel: 'Add spec',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'label', label: 'Label', type: 'text' },
              { k: 'value', label: 'Value', type: 'text' },
            ],
            def: [
              { icon: '👥', label: 'Capacity', value: '350–450 Guests' },
              { icon: '❄️', label: 'Climate', value: 'Full AC' },
              { icon: '🔊', label: 'Sound', value: 'Premium System' },
              { icon: '💡', label: 'Lighting', value: 'Mood + LED' },
              { icon: '🎬', label: 'Stage', value: 'Grand LED Stage' },
              { icon: '🚘', label: 'Parking', value: 'Valet Service' },
            ],
          },
        ],
      },
      {
        id: 'wd_halls',
        label: 'Our Venues',
        hint: 'Uses the halls set up on the Banquet Hall page.',
        fields: [
          { k: 'show_wd_halls', label: 'Show this section', type: 'toggle', def: true },
          { k: 'wd_halls_eyebrow', label: 'Eyebrow', type: 'text', def: 'Our Venues' },
          { k: 'wd_halls_title', label: 'Heading', type: 'text', def: '3 Grand Banquet Halls' },
          { k: 'wd_halls_desc', label: 'Sub-text', type: 'text', full: true, def: 'Choose the perfect hall for your celebration' },
        ],
      },
      {
        id: 'wd_gallery',
        label: 'Gallery',
        fields: [
          { k: 'wd_gallery_eyebrow', label: 'Eyebrow', type: 'text', def: 'Gallery' },
          { k: 'wd_gallery_title', label: 'Heading', type: 'text', def: 'Moments of Elegance' },
          { k: 'wd_gallery_desc', label: 'Sub-text', type: 'text', full: true, def: 'A glimpse of the magic we create' },
          {
            k: 'wd_gallery', label: 'Photos', type: 'list', full: true, itemLabel: 'alt', addLabel: 'Add photo',
            item: [
              { k: 'src', label: 'Photo', type: 'image' },
              { k: 'alt', label: 'Caption', type: 'text' },
            ],
            def: [
              { src: '/images/hotel_front.jpg', alt: 'Property — Hotel Front' },
              { src: '/images/hotel_entrance.jpg', alt: 'Hotel Entrance' },
              { src: '/images/hotel_corridor.jpg', alt: 'Hotel Corridor' },
              { src: '/images/gym.jpg', alt: 'Gymnasium' },
              { src: '/images/pool_indoor.jpg', alt: 'Indoor Swimming Pool' },
              { src: '/images/pool_3.jpg', alt: 'Pool Area' },
              { src: '/images/banquet_hall_1.jpg', alt: 'Grand Banquet Hall' },
              { src: '/images/banquet_hall_1_2.jpg', alt: 'Grand Banquet — Setup' },
              { src: '/images/banquet_hall_1_3.jpg', alt: 'Grand Banquet — Stage' },
              { src: '/images/banquet_hall_2.jpg', alt: 'Banquet Hall' },
              { src: '/images/banquet_hall_2_2.jpg', alt: 'Banquet Hall — Setup' },
              { src: '/images/banquet_hall_3.jpg', alt: 'Intimate Hall' },
              { src: '/images/banquet_hall_3_2.jpg', alt: 'Intimate Hall — Decor' },
              { src: '/images/room_super_executive.jpg', alt: 'Executive Deluxe Room' },
              { src: '/images/room_super_executive_2.jpg', alt: 'Executive Deluxe — Interior' },
              { src: '/images/room_executive.jpg', alt: 'Executive Room' },
              { src: '/images/room_super_deluxe.jpg', alt: 'Superior Deluxe Room' },
              { src: '/images/room_deluxe.jpg', alt: 'Superior Room' },
              { src: '/images/lobby.jpg', alt: 'Hotel Lobby' },
              { src: '/images/reception.jpg', alt: 'Reception' },
              { src: '/images/reception_2.jpg', alt: 'Reception Area' },
            ],
          },
        ],
      },
      {
        id: 'wd_testimonials',
        label: 'Couple Reviews',
        fields: [
          { k: 'show_wd_testimonials', label: 'Show this section', type: 'toggle', def: true },
          { k: 'wd_testi_eyebrow', label: 'Eyebrow', type: 'text', def: 'Happy Couples' },
          { k: 'wd_testi_title', label: 'Heading', type: 'text', def: 'Love Stories at Maa Sharda Palace' },
          {
            k: 'wd_testimonials', label: 'Reviews', type: 'list', full: true, itemLabel: 'name', addLabel: 'Add review',
            item: [
              { k: 'name', label: 'Couple', type: 'text' },
              { k: 'location', label: 'City', type: 'text' },
              { k: 'date', label: 'Date', type: 'text' },
              { k: 'text', label: 'Review', type: 'textarea', rows: 3, full: true },
            ],
            def: [
              { name: 'Priya & Rahul', location: 'Indore', text: 'Maa Sharda Palace made our wedding truly magical. The décor was breathtaking, food was exceptional, and staff made us feel like royalty.', date: 'Feb 2026' },
              { name: 'Anjali & Vikas', location: 'Bhopal', text: 'The grand hall, the lighting, the catering — everything was beyond our expectations. Our guests are still talking about it!', date: 'Jan 2026' },
              { name: 'Sunita & Deepak', location: 'Ujjain', text: 'From sangeet to reception, every event was handled with care and professionalism. The team went above and beyond to make our dream real.', date: 'Mar 2026' },
            ],
          },
        ],
      },
      {
        id: 'wd_cta',
        label: 'Bottom CTA',
        fields: [
          { k: 'wd_cta_img', label: 'Background Image', type: 'image', def: '/images/hero_slide_1.jpg' },
          { k: 'wd_cta_title', label: 'Heading', type: 'text', full: true, hint: 'Wrap words in *asterisks* to highlight them in gold.', def: "Let's Plan Your *Perfect Day*" },
          { k: 'wd_cta_desc', label: 'Body Text', type: 'textarea', rows: 3, full: true, def: 'Our dedicated wedding team is ready to turn your vision into reality. Get in touch today for a personalized consultation and exclusive packages.' },
        ],
      },
      {
        id: 'wd_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_wedding_title', label: 'Page Title', type: 'text', full: true, def: 'Wedding Venue in Ujjain | Hotel Maa Sharda Palace' },
          { k: 'seo_wedding_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Plan your dream wedding at Hotel Maa Sharda Palace Ujjain. Grand banquet halls, premium décor, fine catering & expert coordination. Capacity up to 400 guests.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     UJJAIN DARSHAN
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'darshan',
    label: 'Ujjain Darshan',
    icon: '🕉️',
    path: '/ujjain-darshan',
    desc: 'The temple guide — add, edit or remove any temple, its photo, timings and full write-up.',
    sections: [
      {
        id: 'ud_hero',
        label: 'Hero',
        fields: [
          { k: 'ud_hero_img', label: 'Hero Image', type: 'image', def: '/images/mahakaleshwarr.jpg' },
          { k: 'ud_hero_icon', label: 'Ornament Icon', type: 'text', def: '🕉' },
          { k: 'ud_eyebrow', label: 'Eyebrow', type: 'text', def: 'Explore the Sacred City' },
          { k: 'ud_title', label: 'Heading', type: 'text', def: 'Ujjain Darshan' },
          { k: 'ud_desc', label: 'Sub-text', type: 'textarea', rows: 2, full: true, def: 'Discover the sacred temples and spiritual destinations of Ujjain — the City of Lord Mahakal' },
          { k: 'ud_badges', label: 'Badges', type: 'tags', full: true, hint: 'One per line', def: ['🛕 10 Sacred Temples', '📍 Near Our Hotel', '✨ Bhasma Aarti'] },
        ],
      },
      {
        id: 'ud_intro',
        label: 'Intro',
        fields: [
          { k: 'ud_intro_body', label: 'Body Text', type: 'textarea', rows: 5, full: true, hint: 'Leave a blank line between paragraphs.', def: 'Ujjain, one of the seven sacred cities (Sapta Puri) of India, is a city of immense religious and historical significance. Home to the famous Mahakaleshwar Jyotirlinga, this ancient city on the banks of the Shipra River is a must-visit for every devotee.\n\nConveniently located near major temples, Hotel Maa Sharda Palace is the perfect base for your Ujjain pilgrimage.' },
        ],
      },
      {
        id: 'ud_places',
        label: 'Temples & Places',
        fields: [
          { k: 'ud_places_eyebrow', label: 'Eyebrow', type: 'text', def: 'Must Visit' },
          { k: 'ud_places_title', label: 'Heading', type: 'text', def: 'Top Places in Ujjain' },
          { k: 'ud_places_desc', label: 'Sub-text', type: 'text', full: true, def: 'Click "Read More" on any place to get full details, timings and distance from our hotel' },
          {
            k: 'ud_places', label: 'Places', type: 'list', full: true, itemLabel: 'name', addLabel: 'Add a place',
            item: [
              { k: 'name', label: 'Name', type: 'text' },
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'subtitle', label: 'Subtitle', type: 'text', full: true },
              { k: 'image', label: 'Photo', type: 'image' },
              { k: 'timing', label: 'Timings', type: 'text' },
              { k: 'distance', label: 'Distance', type: 'text' },
              { k: 'short', label: 'Short Description', type: 'textarea', rows: 3, full: true },
              { k: 'details', label: 'Full Details', type: 'textarea', rows: 10, full: true, hint: 'Blank line = new paragraph. **Bold line** for bold. "- " for bullets.' },
            ],
            def: [
              {
                name: 'Mahakaleshwar Jyotirlinga', subtitle: 'One of the 12 Sacred Jyotirlingas of India',
                image: '/images/mahakaleshwar.jpg', icon: '🕉️',
                short: 'The most sacred temple of Ujjain, dedicated to Lord Shiva. One of the 12 Jyotirlingas in India and the only south-facing Shiva lingam.',
                details: 'Mahakaleshwar Temple is one of the most sacred Hindu temples in India, dedicated to Lord Shiva. Located in the ancient city of Ujjain, Madhya Pradesh, it is one of the twelve Jyotirlingas — the most sacred abodes of Shiva.\n\nWhat makes this temple unique is that the Shiva lingam here is Swayambhu (self-manifested), deriving its power from within itself. The deity is also unique as it faces south (Dakshinamukhi), which is rare among Jyotirlingas.\n\nThe famous Bhasma Aarti (ash ritual) performed every morning before sunrise is one of the most extraordinary religious rituals in India. Devotees wait months to attend this aarti.\n\n**Timings:** 4:00 AM – 11:00 PM\n**Bhasma Aarti:** 4:00 AM – 6:00 AM (Pre-booking required)\n**Distance from Hotel:** Approximately 8 km',
                timing: '4:00 AM – 11:00 PM', distance: '~8 km from hotel',
              },
              {
                name: 'Mahakal Lok', subtitle: 'Grand Spiritual Corridor of Ujjain',
                image: '/images/mahakal_lok.jpg', icon: '🏛️',
                short: 'A grand 900-meter spiritual corridor connecting Rudra Sagar to Mahakaleshwar Temple, featuring 190+ sculptures and statues depicting scenes from Shiva Purana.',
                details: 'Mahakal Lok is a magnificent spiritual corridor developed by the Government of Madhya Pradesh to enhance the religious experience of pilgrims visiting the Mahakaleshwar Temple.\n\nStretching over 900 meters, this corridor features over 190 murals and 108 life-size statues depicting stories from the Shiva Purana and Srimad Bhagavatam. The beautifully illuminated walkway is especially breathtaking in the evening.\n\nThe corridor connects Rudra Sagar Lake to the Mahakaleshwar Temple and features:\n- 108 pillars with intricate carvings\n- Beautiful landscaped gardens\n- Food courts and resting areas\n- Stunning light and sound show in the evenings\n\n**Best Time to Visit:** Evening for the light show\n**Timings:** Open 24 hours\n**Distance from Hotel:** Approximately 8 km',
                timing: 'Open 24 hours', distance: '~8 km from hotel',
              },
              {
                name: 'Kal Bhairav Temple', subtitle: 'Ancient Temple of the Guardian of Ujjain',
                image: '/images/kal_bhairav.jpg', icon: '🔱',
                short: 'An ancient and mysterious temple dedicated to Kal Bhairav, the guardian deity of Ujjain. Famous for the unique prasad offering of liquor to the deity.',
                details: 'Kal Bhairav Temple is one of the most ancient and mystical temples of Ujjain. Kal Bhairav is considered the guardian deity (Kotwal) of Ujjain and is a fierce manifestation of Lord Shiva.\n\nThe temple is famous for its unique ritual where liquor (Madira) is offered to the deity as prasad. Devotees bring bottles of alcohol which are believed to be consumed by the idol — a phenomenon that has astonished scientists and devotees alike.\n\nThe temple dates back to the time of King Chandapradeep, and finds mention in the ancient text Avanti Khand. The main idol is adorned with garlands and vibrant decorations.\n\n**Key Features:**\n- Ancient idol with a striking red face\n- Unique liquor prasad ritual\n- Vibrant festival celebrations\n- Historical significance dating back centuries\n\n**Timings:** 6:00 AM – 10:00 PM\n**Distance from Hotel:** Approximately 6 km',
                timing: '6:00 AM – 10:00 PM', distance: '~6 km from hotel',
              },
              {
                name: 'Mangalnath Temple', subtitle: 'The Birthplace of Mars (Mangal Grah)',
                image: '/images/Mangalnath.jpg', icon: '🪐',
                short: 'According to ancient scriptures, Mars (Mangal Grah) was born in Ujjain. This temple is considered the birthplace of the planet Mars and is significant for Navgrah worship.',
                details: 'Mangalnath Temple, situated on the banks of the Shipra River, is one of the most important astrological sites in India. According to the ancient text Matsya Purana, Mars (Mangal Grah) was born from the earth in Ujjain, making this city the birthplace of the planet.\n\nThe temple sits on a hill and offers a panoramic view of the city and the Shipra River. It is especially significant for people with Mangal Dosha in their horoscope, who come here to perform special pujas.\n\n**Significance:**\n- Only place on Earth considered birthplace of planet Mars\n- Important Navgrah pilgrimage site\n- Special Mangal Dosha Nivaran puja performed here\n- Ancient temple with historical importance\n\n**Special Puja:** Mangal (Tuesday) puja is most significant\n**Timings:** 6:00 AM – 9:00 PM\n**Distance from Hotel:** Approximately 5 km',
                timing: '6:00 AM – 9:00 PM', distance: '~5 km from hotel',
              },
              {
                name: 'Navgrah Shani Mandir', subtitle: 'Temple of the Nine Planets',
                image: '/images/navgrah_shani.jpg', icon: '⭐',
                short: "A famous temple dedicated to all nine planets (Navgrahas), especially Lord Shani (Saturn). Located very close to our hotel, it is one of Ujjain's most visited temples.",
                details: 'The Navgrah Shani Mandir in Ujjain is one of the most revered temples dedicated to the nine planets (Navgrahas), with special emphasis on Lord Shani (Saturn). Ujjain has been considered the center of astrological studies since ancient times, and this temple holds immense importance.\n\nConveniently located very close to Hotel Maa Sharda Palace, this temple draws thousands of devotees every Saturday (Shani\'s sacred day) who come seeking blessings for relief from Shani\'s malefic effects.\n\n**Key Features:**\n- Idols of all nine planets installed\n- Special Shani puja every Saturday\n- Renowned for astrological significance\n- Beautiful temple architecture\n- Very close to our hotel — walking distance possible\n\n**Most Crowded:** Saturday (Shani Day)\n**Timings:** 5:00 AM – 10:00 PM\n**Distance from Hotel:** Walking distance / 0.5 km',
                timing: '5:00 AM – 10:00 PM', distance: 'Walking distance from hotel',
              },
              {
                name: 'Harsiddhi Temple', subtitle: 'One of the 51 Shakti Peethas of India',
                image: '/images/Harsiddhii.webp', icon: '🌺',
                short: 'An important Shakti Peetha and one of the 51 sacred sites of Goddess Shakti. The temple is known for its two giant lamps that are lit during Navratri.',
                details: "Harsiddhi Temple is one of the most important Shakti Peethas in India. According to Hindu mythology, when Lord Shiva was carrying the body of Goddess Sati, her elbow fell at this spot in Ujjain. This makes it one of the 51 Shakti Peethas — sacred sites where parts of Goddess Sati's body fell.\n\nThe presiding deity is Goddess Harsiddhi, considered the patron goddess of the legendary King Vikramaditya. The king is said to have offered his head to the goddess nine times, each time miraculously restored.\n\n**Famous For:**\n- Two giant lamp pillars (Deepstambh) with 1,100 earthen lamps lit during Navratri\n- Ancient idol of Goddess Harsiddhi\n- Connection to King Vikramaditya's legend\n- Beautiful illumination during festivals\n\n**Best Time:** Navratri for the spectacular lamp lighting\n**Timings:** 5:00 AM – 10:00 PM\n**Distance from Hotel:** Approximately 7 km",
                timing: '5:00 AM – 10:00 PM', distance: '~7 km from hotel',
              },
              {
                name: 'ISKCON Temple', subtitle: 'International Society for Krishna Consciousness',
                image: '/images/ISKCON.jpg', icon: '🪷',
                short: 'A beautiful and serene temple of the International Society for Krishna Consciousness (ISKCON), dedicated to Lord Krishna and Radha. Known for its cleanliness and spiritual atmosphere.',
                details: 'The ISKCON Temple in Ujjain is a beautiful and peaceful temple dedicated to Radha-Madanmohan (Lord Krishna). Built by the International Society for Krishna Consciousness, the temple is known for its stunning architecture, cleanliness, and serene spiritual atmosphere.\n\nThe temple complex features beautifully decorated deities, daily bhajans and kirtans, and a sattvik prasadam (vegetarian food) distribution facility. It is a perfect place for those seeking peace and devotion in a calm environment.\n\n**Activities at ISKCON Ujjain:**\n- Daily aarti and kirtan sessions\n- Prasadam distribution\n- Spiritual discourses\n- Beautiful garden and temple complex\n- Book shop with spiritual literature\n\n**Special Days:** Janmashtami, Radhashtami, and Ekadashi\n**Timings:** 4:30 AM – 1:00 PM | 4:00 PM – 9:00 PM\n**Distance from Hotel:** Approximately 10 km',
                timing: '4:30 AM – 1:00 PM | 4:00 PM – 9:00 PM', distance: '~10 km from hotel',
              },
              {
                name: 'Sandipani Ashram', subtitle: 'Gurukul of Lord Krishna and Sudama',
                image: '/images/sandipani_ashram.jpg', icon: '📚',
                short: 'The ancient ashram where Lord Krishna, Balrama, and Sudama received their education from Guru Sandipani. A place of immense historical and religious significance.',
                details: 'Sandipani Ashram is one of the most historically significant sites in Ujjain. This is the sacred gurukul (school) where Lord Krishna, Balarama, and their dear friend Sudama received their education from their guru, Sandipani Muni.\n\nThe ashram is maintained in the same spirit as an ancient gurukul and is an important pilgrimage site for Krishna devotees. A stone slab here is believed to have been used as a writing slate by Lord Krishna himself.\n\n**Historical Significance:**\n- Lord Krishna and Balarama\'s place of education\n- Ancient well where Krishna fetched water for his guru\n- Stone slab believed to be Krishna\'s writing slate\n- Statues of Guru Sandipani with Krishna and Balarama\n- Peaceful and spiritually charged environment\n\n**Perfect For:** Families, students, and Krishna devotees\n**Timings:** 7:00 AM – 12:00 PM | 4:00 PM – 8:00 PM\n**Distance from Hotel:** Approximately 9 km',
                timing: '7:00 AM – 12:00 PM | 4:00 PM – 8:00 PM', distance: '~9 km from hotel',
              },
              {
                name: 'Chintaman Ganesh Temple', subtitle: 'Swayambhu Ganesh — The Wish Fulfilling God',
                image: '/images/chintaman_ganesh.webp', icon: '🐘',
                short: 'One of the most ancient Ganesh temples in India. The idol here is Swayambhu (self-manifested) and is believed to fulfill all wishes of sincere devotees.',
                details: 'Chintaman Ganesh Temple is one of the most revered and ancient Ganesh temples in India, located in Ujjain. The word "Chintaman" means "one who removes all worries and fulfills wishes," and devotees believe that sincere prayers here are always answered.\n\nThe idol of Lord Ganesha here is Swayambhu (self-manifested), meaning it was not carved by human hands but appeared naturally. The temple is situated near the Shipra River and holds immense religious significance.\n\n**Temple Highlights:**\n- Swayambhu (self-manifested) Ganesha idol\n- One of the oldest Ganesha temples in India\n- Beautifully decorated during Ganesh Chaturthi\n- Peaceful location near the Shipra River\n- Special morning and evening aartis\n\n**Best Time to Visit:** Ganesh Chaturthi festival\n**Timings:** 5:00 AM – 10:00 PM\n**Distance from Hotel:** Approximately 6 km',
                timing: '5:00 AM – 10:00 PM', distance: '~6 km from hotel',
              },
              {
                name: 'Gopal Mandir', subtitle: 'The Grand Temple of Lord Krishna in the Heart of Ujjain',
                image: '/images/gopal_mandir.jpg', icon: '🌼',
                short: 'A magnificent 19th-century temple dedicated to Lord Krishna, built by the Maratha Queen Bayajibai Shinde. Known for its stunning silver-plated entrance doors.',
                details: 'Gopal Mandir, also known as Dwarkadheesh Temple, is one of the largest and most beautiful temples in Ujjain. Built in the 19th century by Maratha Queen Bayajibai Shinde, the temple is dedicated to Lord Krishna and is a fine example of Maratha temple architecture.\n\nThe temple is most famous for its stunning silver-plated entrance doors, which were originally part of the Somnath Temple and were brought here by Mahadji Shinde. The main shrine houses a beautiful idol of Lord Krishna with Radha.\n\n**Temple Features:**\n- Magnificent silver-plated entrance doors\n- Beautiful Maratha-style architecture\n- Large courtyard with a sacred tank\n- Stunning idol of Radha-Krishna\n- Located in the heart of Ujjain city — easy to visit\n\n**Best Time:** Morning aarti and evening darshan\n**Timings:** 6:00 AM – 12:00 PM | 4:00 PM – 9:00 PM\n**Distance from Hotel:** Approximately 8 km',
                timing: '6:00 AM – 12:00 PM | 4:00 PM – 9:00 PM', distance: '~8 km from hotel',
              },
            ],
          },
        ],
      },
      {
        id: 'ud_tips',
        label: 'Travel Tips',
        fields: [
          { k: 'show_ud_tips', label: 'Show this section', type: 'toggle', def: true },
          { k: 'ud_tips_eyebrow', label: 'Eyebrow', type: 'text', def: 'Helpful Guide' },
          { k: 'ud_tips_title', label: 'Heading', type: 'text', def: 'Travel Tips' },
          { k: 'ud_tips_desc', label: 'Sub-text', type: 'text', full: true, def: 'Make your darshan experience smooth and memorable' },
          {
            k: 'ud_tips', label: 'Tips', type: 'list', full: true, itemLabel: 'tip', addLabel: 'Add tip',
            item: [
              { k: 'icon', label: 'Icon', type: 'text' },
              { k: 'tip', label: 'Title', type: 'text' },
              { k: 'desc', label: 'Description', type: 'textarea', rows: 2, full: true },
            ],
            def: [
              { icon: '👕', tip: 'Dress Code', desc: 'Wear modest, traditional clothing while visiting temples. Avoid shorts and sleeveless tops.' },
              { icon: '🥿', tip: 'Footwear', desc: 'Remove footwear before entering all temple premises. Carry a bag for your shoes.' },
              { icon: '📷', tip: 'Photography', desc: 'Photography may be restricted inside main shrines. Always ask before clicking photos.' },
              { icon: '⏰', tip: 'Best Time', desc: 'Visit temples early morning for a peaceful darshan experience and shorter queues.' },
              { icon: '💧', tip: 'Stay Hydrated', desc: 'Carry water especially during summers. Ujjain can be very hot from April to June.' },
              { icon: '🚗', tip: 'Transport', desc: 'Our hotel offers pickup & drop services. Auto rickshaws are also easily available.' },
            ],
          },
        ],
      },
      {
        id: 'ud_cta',
        label: 'Bottom CTA',
        fields: [
          { k: 'ud_cta_title', label: 'Heading', type: 'text', full: true, def: 'Plan Your Ujjain Pilgrimage' },
          { k: 'ud_cta_desc', label: 'Body Text', type: 'textarea', rows: 2, full: true, def: 'Stay at Hotel Maa Sharda Palace — centrally located, close to all major temples. Our staff can help you plan your darshan schedule.' },
          { k: 'ud_cta_btn', label: 'Second Button Text', type: 'text', def: 'View Rooms' },
          { k: 'ud_cta_btn_link', label: 'Second Button Link', type: 'text', def: '/rooms' },
        ],
      },
      {
        id: 'ud_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_darshan_title', label: 'Page Title', type: 'text', full: true, def: 'Ujjain Darshan | Temple Tour Guide | Hotel Maa Sharda Palace' },
          { k: 'seo_darshan_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: "Complete guide to Ujjain's top temples and religious places — Mahakaleshwar, Mahakal Lok, Kal Bhairav, Navgrah Shani Mandir and more." },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     CONTACT
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'contact',
    label: 'Contact Page',
    icon: '📞',
    path: '/contact',
    desc: 'Contact details come from Global. Here you edit the banner, map and "how to reach us" list.',
    sections: [
      {
        id: 'ct_hero',
        label: 'Page Banner',
        fields: [
          { k: 'contact_hero_title', label: 'Heading', type: 'text', def: 'Contact Us' },
          { k: 'contact_hero_img', label: 'Banner Image', type: 'image', def: '/images/hero_slide_1.jpg' },
          { k: 'contact_eyebrow', label: 'Eyebrow', type: 'text', def: 'Get in Touch' },
        ],
      },
      {
        id: 'ct_reach',
        label: 'How to Reach Us',
        fields: [
          { k: 'contact_reach_title', label: 'Heading', type: 'text', full: true, def: 'How to Reach Us' },
          { k: 'contact_reach', label: 'Distances', type: 'tags', full: true, hint: 'One per line', def: ['🚉 From Ujjain Railway Station: ~8.5 km', '✈️ From Indore Airport: ~50 km', '🛕 From Mahakaleshwar Temple: ~8 km', '🛕 From Kal Bhairav Temple: ~15 km', '🌊 From Ram Ghat: ~8 km', '🛺 Auto-rickshaws readily available', '📍 On Indore Road, near Navgrah Shani Mandir'] },
        ],
      },
      {
        id: 'ct_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_contact_title', label: 'Page Title', type: 'text', full: true, def: 'Contact Us | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_contact_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Contact Hotel Maa Sharda Palace. Phone: 9109103571. Address: Indore Rd, near Navgrah Shani Mandir, Ujjain.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     FAQ
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'faq',
    label: 'FAQ',
    icon: '❓',
    path: '/faq',
    sections: [
      {
        id: 'faq_hero',
        label: 'Page Banner',
        fields: [
          { k: 'faq_hero_title', label: 'Heading', type: 'text', def: 'Frequently Asked Questions' },
          { k: 'faq_hero_img', label: 'Banner Image', type: 'image', def: '/images/hero_slide_1.jpg' },
        ],
      },
      {
        id: 'faq_list',
        label: 'Questions',
        fields: [
          {
            k: 'faq_items', label: 'Questions', type: 'list', full: true, itemLabel: 'q', addLabel: 'Add question',
            item: [
              { k: 'q', label: 'Question', type: 'text', full: true },
              { k: 'a', label: 'Answer', type: 'textarea', rows: 3, full: true },
            ],
            def: [
              { q: 'What are the check-in and check-out times?', a: 'Check-in is at 12:00 PM and check-out is at 10:00 AM. Early check-in and late check-out are available upon request, subject to availability.' },
              { q: 'Is the swimming pool open to all guests?', a: 'Yes, our indoor swimming pool is exclusively available for hotel guests at no extra charge. Pool timings: 7:00 AM – 10:00 AM and 2:00 PM – 5:00 PM.' },
              { q: 'How many banquet halls do you have and what is the capacity?', a: 'We have 3 fully air-conditioned banquet halls suitable for weddings, conferences, and social events. Capacity ranges from 100 to 400+ guests. Contact us for customized event packages.' },
              { q: 'Is parking available at the hotel?', a: 'Yes, complimentary parking is available for all hotel guests within the hotel premises.' },
              { q: 'What room types are available?', a: 'We offer 4 room categories: Superior, Superior Deluxe, Executive, and Executive Deluxe. All rates are subject to availability.' },
              { q: 'Is the hotel near Mahakal Temple?', a: 'We are located on Indore Road near Navgrah Shani Mandir. Mahakal Temple is approximately 8 km from our property, easily accessible by auto or taxi.' },
              { q: 'Do you offer room service?', a: 'Yes, 24/7 room service is available. Guests can order food and beverages from our in-house menu at any time.' },
              { q: 'Is WiFi available in rooms?', a: 'Yes, complimentary high-speed WiFi is available in all rooms and common areas throughout the hotel.' },
            ],
          },
        ],
      },
      {
        id: 'faq_cta',
        label: 'Bottom CTA',
        fields: [
          { k: 'faq_cta_title', label: 'Heading', type: 'text', full: true, def: 'Still Have Questions?' },
          { k: 'faq_cta_desc', label: 'Body Text', type: 'textarea', rows: 2, full: true, def: 'Our team is available 24/7 to help you with anything you need.' },
        ],
      },
      {
        id: 'faq_seo',
        label: 'Search Engine (SEO)',
        fields: [
          { k: 'seo_faq_title', label: 'Page Title', type: 'text', full: true, def: 'FAQ | Hotel Maa Sharda Palace Ujjain' },
          { k: 'seo_faq_desc', label: 'Meta Description', type: 'textarea', rows: 2, full: true, def: 'Frequently asked questions about Hotel Maa Sharda Palace — check-in time, room amenities, pool access, banquet booking and more.' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     BLOG / LEGAL / 404
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'blog',
    label: 'Blog Page',
    icon: '📝',
    path: '/blog',
    desc: 'Blog posts are managed under Blog in the sidebar. Here you edit the page headings.',
    sections: [
      {
        id: 'blog_hero',
        label: 'Page Banner',
        fields: [
          { k: 'blog_hero_title', label: 'Heading', type: 'text', def: 'Travel Blog' },
          { k: 'blog_hero_desc', label: 'Sub-text', type: 'text', full: true, def: 'Ujjain travel tips, temple guides, hotel news & more' },
          { k: 'blog_hero_img', label: 'Banner Image', type: 'image', def: '/images/hero_slide_1.jpg' },
          { k: 'blog_empty_text', label: 'Empty State Text', type: 'text', full: true, def: 'No posts yet. Check back soon!' },
        ],
      },
    ],
  },

  {
    id: 'legal',
    label: 'Legal Pages',
    icon: '📄',
    path: '/privacy-policy',
    desc: 'Privacy Policy and Terms & Conditions — add, edit or remove any clause.',
    sections: [
      {
        id: 'privacy',
        label: 'Privacy Policy',
        fields: [
          { k: 'privacy_title', label: 'Page Heading', type: 'text', def: 'Privacy Policy' },
          { k: 'privacy_updated', label: 'Last Updated', type: 'text', def: 'January 2026' },
          {
            k: 'privacy_sections', label: 'Clauses', type: 'list', full: true, itemLabel: 'heading', addLabel: 'Add clause',
            item: [
              { k: 'heading', label: 'Heading', type: 'text', full: true },
              { k: 'body', label: 'Text', type: 'textarea', rows: 4, full: true },
            ],
            def: [
              { heading: 'Information We Collect', body: 'When you contact us via phone, WhatsApp, or our website, we may collect your name, phone number, email address, and booking details to process your reservation and provide hospitality services.' },
              { heading: 'How We Use Your Information', body: 'We use your information solely to process bookings, confirm reservations, send relevant communications about your stay, and improve our services. We do not sell or share your data with third parties for marketing purposes.' },
              { heading: 'Data Security', body: 'We implement appropriate technical and organisational measures to protect your personal information against unauthorized access, alteration, or disclosure.' },
              { heading: 'Cookies', body: 'Our website may use cookies to improve your browsing experience. You can choose to disable cookies in your browser settings.' },
              { heading: 'Contact Us', body: 'For any privacy-related queries, please contact us using the phone number or email address listed on this website.' },
            ],
          },
        ],
      },
      {
        id: 'terms',
        label: 'Terms & Conditions',
        fields: [
          { k: 'terms_title', label: 'Page Heading', type: 'text', def: 'Terms & Conditions' },
          { k: 'terms_updated', label: 'Last Updated', type: 'text', def: 'January 2026' },
          {
            k: 'terms_sections', label: 'Clauses', type: 'list', full: true, itemLabel: 'heading', addLabel: 'Add clause',
            item: [
              { k: 'heading', label: 'Heading', type: 'text', full: true },
              { k: 'body', label: 'Text', type: 'textarea', rows: 4, full: true },
            ],
            def: [
              { heading: 'Reservations & Bookings', body: 'Room reservations are subject to availability. A booking is confirmed only upon receiving confirmation from our team. We reserve the right to cancel unconfirmed bookings.' },
              { heading: 'Check-In & Check-Out', body: 'Standard check-in and check-out times are as listed on this website. Early check-in and late check-out are available subject to room availability and may incur additional charges.' },
              { heading: 'Cancellation Policy', body: "Cancellations made 24 hours before the check-in date will receive a full refund. Late cancellations or no-shows may be charged for one night's stay." },
              { heading: 'Guest Conduct', body: 'Guests are expected to conduct themselves in a manner that respects the comfort and privacy of other guests. The hotel reserves the right to request guests to vacate the premises in case of misconduct.' },
              { heading: 'Amenities Usage', body: 'Pool, gym, and other amenities are available for hotel guests only. Usage timings are as specified by the hotel and may change without notice.' },
              { heading: 'Liability', body: "The hotel is not liable for any loss or damage to guests' personal belongings. We recommend using the in-room safe for valuables." },
              { heading: 'Contact', body: 'For queries, please use the phone number or email address listed on this website.' },
            ],
          },
        ],
      },
      {
        id: 'notfound',
        label: '404 Page',
        fields: [
          { k: 'nf_title', label: 'Heading', type: 'text', def: 'Page Not Found' },
          { k: 'nf_icon', label: 'Icon', type: 'text', def: '🏨' },
          { k: 'nf_desc', label: 'Body Text', type: 'textarea', rows: 2, full: true, def: "The page you are looking for does not exist. It may have been moved or removed." },
          { k: 'nf_cta', label: 'Home Button Text', type: 'text', def: '🏠 Go to Home' },
        ],
      },
    ],
  },
]

/* ══════════════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════════════ */

/** Every field in the model, flattened. */
export function allFields() {
  const out = []
  CONTENT_MODEL.forEach(page =>
    page.sections.forEach(sec =>
      sec.fields.forEach(f => out.push({ ...f, pageId: page.id, pageLabel: page.label, sectionId: sec.id, sectionLabel: sec.label }))
    )
  )
  return out
}

/** Build the flat defaults object consumed by the whole site. */
function buildDefaults() {
  const def = {}
  allFields().forEach(f => {
    if (f.def !== undefined) def[f.k] = f.def
    else if (f.type === 'toggle') def[f.k] = true
    else if (f.type === 'list' || f.type === 'tags') def[f.k] = []
    else def[f.k] = ''
  })
  return def
}

export const SCHEMA_DEFAULTS = buildDefaults()

/** Keys that are not part of the visual content model but still live in config. */
export const SYSTEM_DEFAULTS = {
  adminUsername: 'admin',
  adminPassword: 'msp@admin2024',
  gtmId: '',
  ga4Id: '',
  fbPixelId: '',
}

export const SITE_DEFAULTS = { ...SCHEMA_DEFAULTS, ...SYSTEM_DEFAULTS }

/** A blank row for a list field, built from its sub-field definitions. */
export function blankItem(field) {
  const row = {}
  ;(field.item || []).forEach(sub => {
    row[sub.k] = sub.type === 'toggle' ? false : sub.type === 'tags' ? [] : ''
  })
  return row
}

/**
 * Upgrade an older saved config to the current model.
 * Runs on every load — safe and idempotent.
 */
export function migrateConfig(saved) {
  if (!saved || typeof saved !== 'object') return {}
  const c = { ...saved }

  // v1 → v2: separate stat_* keys became one `hotel_stats` list
  if (!Array.isArray(c.hotel_stats) && (c.stat_rooms || c.stat_banquets || c.stat_guests || c.stat_experience)) {
    c.hotel_stats = [
      { icon: '🛏️', value: String(c.stat_rooms || '59'), suffix: '+', label: 'Rooms' },
      { icon: '🎪', value: String(c.stat_banquets || '3'), suffix: '', label: 'Banquet Halls' },
      { icon: '😊', value: String(c.stat_guests || '25'), suffix: 'k+', label: 'Happy Guests' },
      { icon: '🏆', value: String(c.stat_experience || '6'), suffix: ' Yrs', label: 'Of Excellence' },
    ]
  }

  // v1 → v2: seo_* objects became flat *_title / *_desc keys
  const seoMap = {
    seo_rooms: ['seo_rooms_title', 'seo_rooms_desc'],
    seo_gallery: ['seo_gallery_title', 'seo_gallery_desc'],
    seo_about: ['seo_about_title', 'seo_about_desc'],
    seo_contact: ['seo_contact_title', 'seo_contact_desc'],
    seo_pool: ['seo_pool_title', 'seo_pool_desc'],
    seo_gym: ['seo_gym_title', 'seo_gym_desc'],
    seo_mandir: ['seo_mandir_title', 'seo_mandir_desc'],
    seo_banquet: ['seo_banquet_title', 'seo_banquet_desc'],
    seo_faq: ['seo_faq_title', 'seo_faq_desc'],
  }
  Object.entries(seoMap).forEach(([oldKey, [tKey, dKey]]) => {
    const o = c[oldKey]
    if (o && typeof o === 'object') {
      if (o.title && !c[tKey]) c[tKey] = o.title
      if (o.description && !c[dKey]) c[dKey] = o.description
    }
  })

  // v1 → v2: the four hard-coded room slots + extra_rooms became one `rooms` list
  if (!Array.isArray(c.rooms) && (c.room_deluxe_name || c.room_exec_name)) {
    const base = SCHEMA_DEFAULTS.rooms
    const legacy = [
      { i: 0, n: 'room_deluxe_name', p: 'room_deluxe_price', d: 'room_deluxe_desc', m: 'room_deluxe_meal', img: 'img_room_deluxe' },
      { i: 1, n: 'room_sdlx_name', p: 'room_sdlx_price', d: 'room_sdlx_desc', m: 'room_sdlx_meal', img: 'img_room_super_deluxe' },
      { i: 2, n: 'room_exec_name', p: 'room_exec_price', d: 'room_exec_desc', m: 'room_exec_meal', img: 'img_room_executive' },
      { i: 3, n: 'room_sexec_name', p: 'room_sexec_price', d: 'room_sexec_desc', m: 'room_sexec_meal', img: 'img_room_super_executive' },
    ]
    c.rooms = base.map((r, idx) => {
      const L = legacy[idx]
      if (!L) return r
      return {
        ...r,
        name: c[L.n] || r.name,
        price: c[L.p] || r.price,
        desc: c[L.d] || r.desc,
        meal: c[L.m] || r.meal,
        img: c[L.img] || r.img,
        img2: c[L.img + '_2'] || r.img2,
        img3: c[L.img + '_3'] || r.img3,
      }
    })
    if (Array.isArray(c.extra_rooms) && c.extra_rooms.length) {
      c.rooms = c.rooms.concat(
        c.extra_rooms.map(r => ({
          slug: r.slug, name: r.name, price: r.price, badge: r.badge || 'Available',
          tagline: r.tagline || '', size: r.size || '', guests: r.guests || '', bed: r.bed || '',
          meal: r.meal || '', desc: r.desc || '', longDesc: r.desc || '',
          features: r.features || [], img: r.imgKey ? (c[r.imgKey] || '') : '', img2: '', img3: '',
        }))
      )
    }
  }

  return c
}
