export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly service: string;
  readonly rating: number;
  readonly review: string;
  readonly date: string;
  readonly location?: string;
  readonly verified?: boolean;
}

export const testimonialsData: readonly Testimonial[] = [
  {
    id: "shelby-kneabone",
    name: "Shelby Kneabone",
    service: "Nail Services & Japanese Hair Spa",
    rating: 5,
    review:
      "This nail salon was amazing! They got me in right away, and Jessica was so kind, welcoming to me and my 8 week old son, made us feel so comfortable. They even made sure there was calming music on for my baby to be relaxed! My nails look great, the product they use isn't really strong smelling either! She gave me amazing feet massage and hand massage too!! I came back and got my nail colour changed to cat eyes like I've always wanted. Both Jessica and Natalia are so talented!! I got a Japanese hair spa as well!!! I highly recommend this salon! So relaxing, calming and welcoming.",
    date: "2024-07-28",
    location: "Regular Client",
    verified: true,
  },
  {
    id: "cindy-luu",
    name: "Cindy Luu",
    service: "Full Service Experience",
    rating: 5,
    review:
      "I had such an amazing experience at N1 Nail Beauty Bar! Teresa is an outstanding nail tech. She's super efficient, detail-oriented, and genuinely cares about her work. She was so friendly and made sure I loved the final design. Jessica, the owner, went out of her way to make me feel welcome, and the whole place has such a cozy, clean, and inviting vibe. The design and perfection has been fantastic, which speaks to the quality of their work. It's absolutely worth every penny! I highly recommend N1 Nail Beauty Bar if you're looking for top-notch service and a relaxing, enjoyable experience.",
    date: "2023-11-15",
    location: "First-time Client",
    verified: true,
  },
  {
    id: "georgy-belogolovtsev",
    name: "Georgy Belogolovtsev",
    service: "Manicure with Luxury Treatments",
    rating: 5,
    review:
      "Amazing experience at N1 Nail Beauty Bar! They did an incredible job on my nails, and the photos I'm sharing are from my girlfriend's nails, which they also did. The staff went above and beyond, they even treated me to a wax glove hand massage and a chair massage. Everyone was so friendly and professional. We both left feeling completely pampered. Highly recommend!",
    date: "2024-04-15",
    location: "Couple's Visit",
    verified: true,
  },
  {
    id: "farah-bhimani",
    name: "Farah Bhimani",
    service: "Manicure & Gel Services",
    rating: 5,
    review:
      "Had such a great experience at the salon today! Jessica and her staff were so warm, welcoming, and professional. They did a beautiful job on my nails and were so sweet and patient while doing my daughter's as well. She felt so special and left with the biggest smile! The salon itself is clean, stylish, and relaxing. You can really tell they use high-quality, luxurious products that make the experience feel extra special. Thank you for the amazing service. We'll definitely be back!",
    date: "2024-07-17",
    location: "Mother & Daughter",
    verified: true,
  },
  {
    id: "mandorla-yoga",
    name: "Mandorla Yoga Institute",
    service: "Japanese Head Spa & Nails",
    rating: 5,
    review:
      "I absolutely adore Jessica and this is my favourite little hidden gem in Calgary. This is the only place I will go for a Japanese Head Spa. You get a private room with high quality shampoo and they properly dry your hair before you leave. They do a phenomenal job with your nails too and the decor is beautiful! Love!",
    date: "2024-05-15",
    location: "Regular Client",
    verified: true,
  },
  {
    id: "carolina-daffara",
    name: "Carolina Claudino Daffara",
    service: "Bridal Package - Full Service",
    rating: 5,
    review:
      "The customer service I received at N1 Nail Beauty Bar was absolutely top notch! Before even booking the appointment I got to talk through all the services they offered and pick what was right for me. I wanted to get my nails done to match my outfit since I was a bridesmaid at my friends wedding, and they went so far as to find the perfect colour to match! I was in there for a few hours getting everything done (pedicure, manicure and a scalp massage clean and facial) and they made sure I was always comfortable and offered me refreshments throughout. All in all, fantastic experience, above and beyond customer service.",
    date: "2024-06-15",
    location: "Bridal Party",
    verified: true,
  },
  {
    id: "haley-crews",
    name: "Haley Crews",
    service: "Pedicure & Nail Extensions",
    rating: 5,
    review:
      "Jessica, Ann, and Cadie took such great care of us from the moment we walked in the door. They greeted us with water and coffee and made sure we were comfortable. They care deeply about your nail health and making sure everything is just how you like it. By far the most relaxing pedicure I've ever had. The treatment here is unlike anywhere I've been in Calgary. I highly recommend booking an appointment here!",
    date: "2024-06-15",
    location: "First-time Client",
    verified: true,
  },
  {
    id: "carla-crews",
    name: "Carla Crews",
    service: "Mother's Day Pedicure",
    rating: 5,
    review:
      "My daughter brought me for a belated Mother's Day pedicure. The salon is modern, bright and clean. Everyone at the salon is incredibly talented and friendly. This was by far the BEST pedicure I've ever had. My feet have never been softer! The attention to detail and personalized care made this such a special experience.",
    date: "2024-06-15",
    location: "Special Occasion",
    verified: true,
  },
  {
    id: "zen-alvaniz",
    name: "Zen Alvaniz",
    service: "Manicure",
    rating: 5,
    review:
      "Service here is amazing! Loved getting my nails done. It was calm, peaceful, and relaxing. I enjoyed chatting with the nail tech, Teresa. She was very kind, patient, careful and considerate. Asked me multiple times if I was okay and accommodated to my needs and wants. Thank you for the amazing service and the cute, and beautiful nails! I highly recommend this place.",
    date: "2023-12-15",
    location: "First-time Client",
    verified: true,
  },
  {
    id: "chi-pajarillaga",
    name: "Chi Pajarillaga",
    service: "Nail Extensions",
    rating: 5,
    review:
      "The ladies in this salon are very knowledgeable of their craft. Top notch customer service, cozy ambiance, great selection of colors and very open to requests/preferences, very clean salon too. I wanted a squarish oval nail shape and Menah did it perfectly, more than I expected actually. I will surely recommend them and will definitely be back!",
    date: "2023-12-15",
    location: "Regular Client",
    verified: true,
  },
  {
    id: "tonanzin-romero",
    name: "Tonanzin Romero",
    service: "Pedicure & Manicure",
    rating: 5,
    review:
      "I can't say enough good things about Teresa! She always makes my nails look absolutely beautiful and perfectly shaped. Her attention to detail is incredible—she ensures that I'm happy with everything along the way. Plus, she's so sweet and friendly, making the experience even better. I'm always impressed by how quickly she works without sacrificing quality. I highly recommend Teresa to anyone looking for an amazing nail artist!",
    date: "2023-10-15",
    location: "Regular Client",
    verified: true,
  },
  {
    id: "elisabeth-fayt",
    name: "Elisabeth Fayt",
    service: "Manicure & Pedicure",
    rating: 5,
    review:
      "I had a mani pedi before my trip to India for a whole month. It's two months later and my nails still look perfect. N1 nails did an amazing job. So thorough. Perfect work. I'm hooked.",
    date: "2024-03-15",
    location: "Travel Prep",
    verified: true,
  },
  {
    id: "emma-carmichael",
    name: "Emma Carmichael",
    service: "Manicure",
    rating: 5,
    review:
      "Had the best experience at N1 nails! From start to finish the service was lovely. I can't stop looking at my nails they were done so well, every single nail is perfect. I tried out N1 for the first time and I will definitely be back!",
    date: "2024-01-15",
    location: "First-time Client",
    verified: true,
  },
  {
    id: "joshua-hur",
    name: "Joshua Hur",
    service: "Luxury Pedicure",
    rating: 5,
    review:
      "I'm thoroughly impressed with this salon! The interior is stunning, and the staff is exceptionally friendly, demonstrating a genuine commitment to customer service. From a business perspective, they're exceptionally organized and efficient. I highly recommend their Luxury Pedicure services, perfect for men who need some pampering. The attention to detail and care taken ensure a truly relaxing experience.",
    date: "2023-10-15",
    location: "Male Client",
    verified: true,
  },
  {
    id: "maya-r",
    name: "Maya R",
    service: "Spa Day Experience",
    rating: 5,
    review:
      "We loved our spa day here! Had the most amazing manicure. The gel products were high end (I got the magnetic sparkles) and the products for hand masks and creams were amazing and the massage was magical. Teresa and Jessica were so professional and excellent nail techs. Will happily come again!",
    date: "2023-11-15",
    location: "Spa Day",
    verified: true,
  },
  {
    id: "jen-ball",
    name: "Jen Ball",
    service: "Nail Extensions",
    rating: 5,
    review:
      "I love this place! So friendly and the nail techs are amazing. Natalia is excellent! I would highly recommend N1!",
    date: "2024-07-26",
    location: "Regular Client",
    verified: true,
  },
] as const;

export const testimonialStats = {
  totalReviews: testimonialsData.length,
  averageRating: 5.0,
  fiveStarPercentage: 100,
  recommendationRate: 100,
} as const;
