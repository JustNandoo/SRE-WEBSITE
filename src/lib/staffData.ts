// lib/staffData.ts

export interface SocialLinks {
  linkedin: string;
  instagram: string;
}

export interface Member {
  name: string;
  role: string;
  major: string;
  img: string;
  socials: SocialLinks;
}

export interface Division {
  id: string;
  division: string;
  description: string;
  members: Member[];
}

export const staffData: Division[] = [
  {
    id: "spv",
    division: "The Supervisor",
    description:
      "Providing strategic guidance, wisdom, and mentorship to ensure the organization's growth and stability.",
    members: [
      {
        name: "Dr. Ir. Nu Rhahida Arini, S.T., M.T.",
        role: "Supervisor (Pembina)",
        major: "Lecturer",
        img: "https://nurhahidaarini.com/me-2.jpg",
        socials: { linkedin: "", instagram: "" },
      },
    ],
  },
  // Plevel
  {
    id: "exec",
    division: "Executive Board",
    description: "The main pillars driving the organization's vision.",
    members: [
      {
        name: "Elzia Wanoko",
        role: "President",
        major: " D4 Teknik Mekatronika",
        img: "1sKGyNr-p_NozMQ3T7TEibRpD7iGOGQVa",
        socials: { linkedin: "", instagram: "elleelz_" },
      },
      {
        name: "Wining Yulianti",
        role: "Vice President 1",
        major: "D4 Sistem Pembangkit Energi",
        img: "1s0-ccU_JqoNRqB7MBsU0ca0o72Czvu8x",
        socials: { linkedin: "", instagram: "winingyulianti._" },
      },
      {
        name: "Muhammad Ar Rayan",
        role: "Vice President 2",
        major: "D4 Teknik Mekatronika",
        img: "1LzVe051BZNTrzkkDuHfg-wm1ErKOtAEw",
        socials: { linkedin: "", instagram: "aarayannn" },
      },
    ],
  },
  // Secre/Treasure
  {
    id: "admin",
    division: "Secretary and Tresurer",
    description: "Managing administration and financial stability.",
    members: [
      {
        name: "Nisfa Nisrina",
        role: "Secretary 1",
        major: "D4 Teknik Mekatronika",
        img: "1zWJ1AZCDQl9_dpKaNKnMVGrgs37zAOgq",
        socials: { linkedin: "", instagram: "nisfaa_nr" },
      },
      {
        name: "Azza Amaliah Zahara",
        role: "Secretary 2",
        major: "D3 Teknologi Multimedia Broadcasting",
        img: "",
        socials: { linkedin: "", instagram: "" },
      },
      {
        name: "Safira Aisya Putri",
        role: "Treasurer 1",
        major: "D4 Sains Data Terapan",
        img: "",
        socials: { linkedin: "", instagram: "safasyya" },
      },
      {
        name: "Kiandra Kirani",
        role: "Treasurer 2",
        major: "D4 Teknik Telekomunikasi",
        img: "1ll0zplpkuPoHv0kn6kbMdkqNkN4MPwKx",
        socials: { linkedin: "", instagram: "kiraandr_" },
      },
    ],
  },
  // hr
  {
    id: "hr",
    division: "Human Resources",
    description:
      "The heartbeat of the organization. Cultivating talent, fostering internal bonding, and ensuring a thriving community culture.",
    members: [
      {
        name: "Farah Hasna Salsabila",
        role: "Head of Human Resources",
        major: "D4 Teknik Informatika",
        img: "1vfW3P-ttw36wwnCY4qyhnvLCD9CrIPgE",
        socials: { linkedin: "", instagram: "farahasns" },
      },
      {
        name: "Muhammad Naufal",
        role: "HR Associate",
        major: "D4 Teknik Mekatronika",
        img: "1KhPgi7zob2Ng8_J03NvtzwbAW6Tt8xWr",
        socials: { linkedin: "", instagram: "muhamnaufal" },
      },
      {
        name: "Jihan Alya Mukhbita",
        role: "HR Associate",
        major: "D4 Teknik Mekatronika",
        img: "16yu0Ss60aAjbZc6gnVuA5DAGs5g7gjRS",
        socials: { linkedin: "", instagram: "jihannalyaaa" },
      },
      {
        name: "Nafi' Firdaus Hardiansyah",
        role: "HR Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "10ynd4QFXh9OApjXjk3ijYB5-2MPvesnv",
        socials: { linkedin: "", instagram: "naffirdauss" },
      },
      {
        name: "Mochammad Fajriah Nur C.",
        role: "HR Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1naQZVlEAqCVqdH9VvEmSm-fo5nNYX5W8",
        socials: { linkedin: "", instagram: "fr.cahya" },
      },
      {
        name: "Zahra Rizkiyatul Ummah",
        role: "HR Associate",
        major: "D4 Teknik Mekatronika",
        img: "1c0YnXx2UvRISFq4r94-5-t__vq4oVMxY",
        socials: { linkedin: "", instagram: "z.zacra_24" },
      },
      {
        name: "Jihad Akhbar Ayatullah",
        role: "HR Associate",
        major: "D4 Teknik Mekatronika",
        img: "1kuMLInbzhYZv5JmkZ5_RtPXP8nXiXpB-",
        socials: { linkedin: "", instagram: "jihadakhbar_" },
      },
      {
        name: "Andika Krisna Mahendra",
        role: "HR Associate",
        major: "D4 Teknologi Rekayasa Internet",
        img: "1C5jddKY4E6h0F7K0dMdDHRqDDrBFWOVt",
        socials: { linkedin: "", instagram: "mheeend_" },
      },
      {
        name: "Moch. Aldi Aksani",
        role: "HR Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1TBHPXJYds7m9myXo_w-8VDMBLs9tFNss",
        socials: { linkedin: "", instagram: "aldiaksani" },
      },
      {
        name: "Attini Atmara",
        role: "HR Associate",
        major: "D3 Teknik Telekomunikasi",
        img: "1mnWsIoKaNdrSreZfMTEaF5BqXHtbP4kg",
        socials: { linkedin: "", instagram: "attmaraa_" },
      },
      {
        name: "Ni'matul 'Aysya Tsaaniyah",
        role: "HR Associate",
        major: "D4 Teknik Telekomunikasi",
        img: "1Ih32rSomZ6_R8UXJV7hELO7tn5FPE5Rg",
        socials: { linkedin: "", instagram: "syatsaa_" },
      },
      {
        name: "M. Yanuar Ihsanul Qulub",
        role: "HR Associate",
        major: "D4 Teknik Elektro Industri",
        img: "1Lecrdn0Y-xqrGUqf1Hbd9UwKgjBftHJz",
        socials: { linkedin: "", instagram: "myanu._" },
      },
      {
        name: "Azam Akbar Mubarak",
        role: "HR Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1nTNa1oat7lIvI8fINbjauSxtTAH2oWYn",
        socials: { linkedin: "", instagram: "azamakbar__" },
      },
    ],
  },
  // pr
  {
    id: "pr",
    division: "Public Relations",
    description:
      "Building bridges between the organization and the world. Managing external communications, partnerships, and brand image.",
    members: [
      {
        name: "Fathan Ahmad Zaidan",
        role: "Head of Public Relations",
        major: "D4 Teknik Mekatronika",
        img: "1FEiLX-bUrdX5EL7ByhHQSdCIpV4M9ST5",
        socials: { linkedin: "", instagram: "fathanzaidann" },
      },
      {
        name: "Resky Ayu Wandira",
        role: "PR Associate",
        major: "D4 Sains Data Terapan",
        img: "1mkjMp9jgMuFTRPkp0wC-bcMVzP7rJLYs",
        socials: { linkedin: "", instagram: "1directly_" },
      },
      {
        name: "Herdan Wahyu Mairendra Pangestu",
        role: "PR Associate",
        major: "D4 Sains Data Terapan",
        img: "1AP0r3Bx4X_E_aF78bovW5_yIzex925lV",
        socials: { linkedin: "", instagram: "mairendraap" },
      },
      {
        name: "Gendys Amoret",
        role: "PR Associate",
        major: "D4 Teknik Telekomunikasi",
        img: "1tjfeU25a7-8lJNnBpFtbsx5OzQOpoo2h",
        socials: { linkedin: "", instagram: "ggenmore" },
      },
      {
        name: "Redyan Rezi Muhammad",
        role: "PR Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1RmcjRv7Lv-1-uKWQZKiauAndTNAA1y9c",
        socials: { linkedin: "", instagram: "redyanrz.m" },
      },
      {
        name: "Urmila Ristina Zega",
        role: "PR Associate",
        major: "D4 Teknik Telekomunikasi",
        img: "1lL8lyDzA3vO_MohlJO_2FqawZnl6yOHH",
        socials: { linkedin: "", instagram: "aemil.st_" },
      },
      {
        name: "Rafli Ananda Ramadani",
        role: "PR Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1uQ4AlWqmGqnwXzR1IxdzinJ6VrygenJx",
        socials: { linkedin: "", instagram: "raflinnd" },
      },
      {
        name: "Fatma Aliea Wibowo",
        role: "PR Associate",
        major: "D4 Teknik Telekomunikasi",
        img: "1-ho4eKnM-9S2ecqLqTZUeI2D-SOXYCLR",
        socials: { linkedin: "", instagram: "fatmaalea" },
      },
      {
        name: "Achmad Ragil Kurniawan",
        role: "PR Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1GBC2Kv2aL1e2yFrUA9RIvQ_Tr6J1KoSX",
        socials: { linkedin: "", instagram: "aglkrwn" },
      },
    ],
  },
  // finance
  {
    id: "finance",
    division: "Finance",
    description:
      "Managing financial resources, budgeting, and ensuring fiscal responsibility to sustain organizational operations and growth.",
    members: [
      {
        name: "Indra Rahmat Maulidi",
        role: "Head of Finance",
        major: "D4 Teknik Informatika",
        img: "1kqvfnSB5AiiZ10hnt_5ip7_xpFJSPgbG",
        socials: { linkedin: "", instagram: "rm_indraa" },
      },
      {
        name: "Kamila Anwar",
        role: "Finance Associate",
        major: "D4 Teknik Mekatronika",
        img: "15W8fIQv5yGVlkIiilX4tD9if9-RKDdV2",
        socials: { linkedin: "", instagram: "kamilanwr" },
      },
      {
        name: "Maylinda Sava Fuana Wati",
        role: "Finance Associate",
        major: "D4 Teknik Elektro Industri",
        img: "1gXxF-E-z_BACGo_f9EWUhQQffa4YQ8Mc",
        socials: { linkedin: "", instagram: "maylindsavaa" },
      },
      {
        name: "Felisa Nailah Putri",
        role: "Finance Associate",
        major: "D3 Teknik Informatika",
        img: "1o1BXth4KB3dHGqT-xTFZ3huEvfBbvC0i",
        socials: { linkedin: "", instagram: "stlrrt" },
      },
      {
        name: "Made Suralaya Indra Nata",
        role: "Finance Associate",
        major: "D4 Teknologi Rekayasa Internet",
        img: "1irNsB8SwoExk3OgZ6aDde8H_za8Vb5h_",
        socials: { linkedin: "", instagram: "nat_indraa" },
      },
      {
        name: "Amelia Pramudhita Ramadhani Putri",
        role: "Finance Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1dWRHRi9h5Weal4Jq9xIW95ZNuAHIW2kY",
        socials: { linkedin: "", instagram: "liapramudhita" },
      },
      {
        name: "Dyah Fahmi Putri",
        role: "Finance Associate",
        major: "D3 Teknik Elektro Industri",
        img: "1zgaCwZUAGigmKgGSR1UCKeeXiG__r4vD",
        socials: { linkedin: "", instagram: "urgirl.moon" },
      },
      {
        name: "Muhammad Atharyudhia L",
        role: "Finance Associate",
        major: "D4 Teknik Elektro Industri",
        img: "1k2wdgUQaAvMsTjuYA90UWsKbf7TiI7M9",
        socials: { linkedin: "", instagram: "atharyudhiaaaa" },
      },
      {
        name: "I Gede Arjuna Danendra P. H.",
        role: "Finance Associate",
        major: "D4 Sains Data Terapan",
        img: "1vIy0bwaasSoiGFAPFGJMdhSgtkwa-u0Z",
        socials: { linkedin: "", instagram: "junendraa" },
      },
      {
        name: "Laudita Esma Syahputri",
        role: "Finance Associate",
        major: "D4 Sains Data Terapan",
        img: "1rlUorrB0xj0RfooVcf6g5ENf4_9cjGdm",
        socials: { linkedin: "", instagram: "celauu.ta" },
      },
      {
        name: "Peri Nurjaman",
        role: "Finance Associate",
        major: "D4 Teknik Telekomunikasi",
        img: "1psH_EVhLaPmBeagH1e1Q2yIGo7cbjnnA",
        socials: { linkedin: "", instagram: "pey.nr" },
      },
    ],
  },
  // edu
  {
    id: "education",
    division: "Education",
    description:
      "Empowering members through knowledge sharing, workshops, and training programs to enhance skills and expertise in renewable energy.",
    members: [
      {
        name: "Rizky Ramadhan Putra R.",
        role: "Head of Education",
        major: "D4 Sistem Pembangkit Energi",
        img: "1yy0IdHnAWqPzfVav60tJ-YRvJonG19Fb",
        socials: { linkedin: "", instagram: "rizkyrprr" },
      },
      {
        name: "Agung Ahmadi",
        role: "Education Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1QF-7eQFgNZt0RK030wdHUluHJyX4UJu3",
        socials: { linkedin: "", instagram: "agn.ahmdi" },
      },
      {
        name: "Talita Evania Amirah",
        role: "Education Associate",
        major: "D4 Sains Data Terapan",
        img: "1eJisljZzSjA0ZJdxBTrCa8cReoRTN2TC",
        socials: { linkedin: "", instagram: "vnnyyyt" },
      },
      {
        name: "Jelita Pammai",
        role: "Education Associate",
        major: "D4 Teknologi Rekayasa Internet",
        img: "1bTxfrr3av0cxMbObGB7c3Lz1DEHzX_AV",
        socials: { linkedin: "", instagram: "jelizzzzzzz" },
      },
      {
        name: "Lufthansa Alif Aleyya Praptomo",
        role: "Education Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1iy0bzgUUgnUjWqiwh8loF3baxy_WBqpy",
        socials: { linkedin: "", instagram: "lufths_" },
      },
      {
        name: "Jen Roy Syaifudin",
        role: "Education Associate",
        major: "D4 Teknik Komputer",
        img: "1l-BnSkdVffnLhNLUuWaoAqOD6IrNLaC_",
        socials: { linkedin: "", instagram: "syaifudinnn.__" },
      },
      {
        name: "Adelisa Afianti",
        role: "Education Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1dmEHNoA2nMZERdFtWmEF_T-v_nkBLY_u",
        socials: { linkedin: "", instagram: "adelafnt_" },
      },
      {
        name: "Muhammad Adhitya Ramadhani",
        role: "Education Associate",
        major: "D4 Teknik Komputer",
        img: "1jYFCKHFdrUkq2LQO-8JQwqJSmPddavWG",
        socials: { linkedin: "", instagram: "adhitya_arta" },
      },
      {
        name: "Amrina Rahmawati Haqq",
        role: "Education Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1K09hb8krhtITeM7AYVkEnfNhx8P7CIzC",
        socials: { linkedin: "", instagram: "arhaqqz" },
      },
      {
        name: "Muhamad Nabil A.",
        role: "Education Associate",
        major: "D4 Teknik Mekatronika",
        img: "1E2MOSJiIBQPuSExujEQKbIn2w_doriCe",
        socials: { linkedin: "", instagram: "nabil_anandiansyah" },
      },
      {
        name: "Kennenth Laurence Eldridge H",
        role: "Education Associate",
        major: "D4 Teknik Mekatronika",
        img: "1Ftp58yBAzGyI78uwNCvWxTOP8s5QDAkj",
        socials: { linkedin: "", instagram: "ken_kennenth" },
      },
      {
        name: "Rafi Noer Ananta",
        role: "Education Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "",
        socials: { linkedin: "", instagram: "rafianant_" },
      },
    ],
  },
  // compe
  {
    id: "comp-research",
    division: "Competition & Research",
    description:
      "Driving innovation and excellence through competitive participation and cutting-edge research in renewable energy technologies.",
    members: [
      {
        name: "Akhmad Tri Wicaksono",
        role: "Head of Competition & Research",
        major: "D4 Sistem Pembangkit Energi",
        img: "1wwb29M58SFHSvgpL0L0rCRmP52EJ3pkh",
        socials: { linkedin: "", instagram: "ahmmd_d91" },
      },
      {
        name: "Muhammad Chairul Tirtana Firmansyah",
        role: "Competition & Research Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1w1HGQJvE7n3djhamUf0Ox58eKfwtkCdM",
        socials: { linkedin: "", instagram: "frmn_calonengineering" },
      },
      {
        name: "Ro'uf Aufa Rifqi",
        role: "Competition & Research Associate",
        major: "D4 Teknik Elektro Industri",
        img: "1h1k_XOFBZCrEgutjgwwWcpe8drvrC4vg",
        socials: { linkedin: "", instagram: "r_aufarifqi" },
      },
      {
        name: "Syafiq Agra Rizqullah",
        role: "Competition & Research Associate",
        major: "D4 Teknik Elektro Industri",
        img: "1WXZl_jb0GUzfcmeEr7nemY49TFZtlzpK",
        socials: { linkedin: "", instagram: "agraaa_22" },
      },
      {
        name: "Titis Widiyawati",
        role: "Competition & Research Associate",
        major: "D4 Sains Data Terapan",
        img: "1ZrDWIt-GTQX-CyZRg3r7_4pWTPlziCbQ",
        socials: { linkedin: "", instagram: "wdya_inisaya" },
      },
      {
        name: "Chelsea Nevanda",
        role: "Competition & Research Associate",
        major: "D4 Teknik Komputer",
        img: "1mRcCY-eGYMuljCuO8EbMTurbG2El5h7s",
        socials: { linkedin: "", instagram: "im_chellnvanda" },
      },
      {
        name: "Muhammad Syah Erham Amru",
        role: "Competition & Research Associate",
        major: "D4 Teknik Mekatronika",
        img: "15c8wUERnFW25WTw0YmyHe1-Kgow6UedS",
        socials: { linkedin: "", instagram: "syaherhamm" },
      },
      {
        name: "Galang Seto Panuntun",
        role: "Competition & Research Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1hf5RS7P5HEjTks5eMymZ1O42y3mxaPyS",
        socials: { linkedin: "", instagram: "galangsp_" },
      },
      {
        name: "Sutan Adam Pamungkas",
        role: "Competition & Research Associate",
        major: "D4 Teknik Mekatronika",
        img: "10SHmc0anWdLSd6ByZLDuuS6z35HYFX_5",
        socials: { linkedin: "", instagram: "pamungkas.stn" },
      },
      {
        name: "Joe Funda Irkham",
        role: "Competition & Research Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "",
        socials: { linkedin: "", instagram: "joe.f_i" },
      },
      {
        name: "Gilang Ramadhan S. Z. P.",
        role: "Competition & Research Associate",
        major: "D4 Teknik Mekatronika",
        img: "13mJDtH6Hk-5khKJjNgC1HCrMtnH5ZXqE",
        socials: { linkedin: "", instagram: "gllanng" },
      },
      {
        name: "Maulana Hildan Henri Firdaus",
        role: "Competition & Research Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1UuYSLaNhReMjBmLLxuLur1x0VCtlkdGC",
        socials: { linkedin: "", instagram: "hildaann_" },
      },
      {
        name: "Raja Alamsyah",
        role: "Competition & Research Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1knEZy2njrha85UXH8hd3T4Gb56PenEVg",
        socials: { linkedin: "", instagram: "rajalamsyahh" },
      },
      {
        name: "Affan Gani Ibrahim",
        role: "Competition & Research Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "",
        socials: { linkedin: "", instagram: "affangn04" },
      },
      {
        name: "Nazurah Fitri Atha Zahirah",
        role: "Competition & Research Associate",
        major: "D4 Teknik Telekomunikasi",
        img: "1nGYT_Hcb4oWhhwW6o2jD_1afPbPxpdO1",
        socials: { linkedin: "", instagram: "nzrhftr_" },
      },
      {
        name: "Aldy Rahman Maulana",
        role: "Competition & Research Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "11i09nek8Fa_9rMzrzydpGzw-PttX1wO2",
        socials: { linkedin: "", instagram: "aldyraahmanm" },
      },
      {
        name: "Annisa Safira Maharani",
        role: "Competition & Research Associate",
        major: "D4 Teknik Mekatronika",
        img: "1G5l-zZ_MN-RmKz5VQtNgMCd96cdiN_1J",
        socials: { linkedin: "", instagram: "hkusfr" },
      },
      {
        name: "Dewi Setyorini",
        role: "Competition & Research Associate",
        major: "D4 Teknik Elektro Industri",
        img: "1r4-ty_zndKhqY54w2NJ3z8tTNLeQA9Wh",
        socials: { linkedin: "", instagram: "dewi.styy" },
      },
    ],
  },
  // CM
  {
    id: "content-marketing",
    division: "Content Marketing",
    description:
      "Crafting compelling narratives and engaging content to amplify the organization's voice and reach across digital platforms.",
    members: [
      {
        name: "Mohammad Arkaan Na'im",
        role: "Head of Content Marketing",
        major: "D4 Teknik Elektro Industri",
        img: "1XOx6Q72hml5zNFIXFShc2ZJd03ZvkBtd",
        socials: { linkedin: "", instagram: "arkaan.naim" },
      },
      {
        name: "Muhammad Nufail Dzakwan",
        role: "Content Marketing Associate",
        major: "D4 Teknik Elektronika",
        img: "1ZHb8iOAdlyfPItFDP57XBSuWwPU0dKS6",
        socials: { linkedin: "", instagram: "aufa.dzkwn" },
      },
      {
        name: "Taesha Marchelia Handoyo",
        role: "Content Marketing Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "",
        socials: { linkedin: "", instagram: "tae_shamarch" },
      },
      {
        name: "Salsabilah Aurelia Arum",
        role: "Content Marketing Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "",
        socials: { linkedin: "", instagram: "cacabilahk" },
      },
      {
        name: "Giosandira Gema Satrio Wicaksono",
        role: "Content Marketing Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "",
        socials: { linkedin: "", instagram: "giostrioww" },
      },
      {
        name: "Febrian Yoga Waskita",
        role: "Content Marketing Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "",
        socials: { linkedin: "", instagram: "bynwaskita" },
      },
      {
        name: "Rahmania Ayu Fitria Hanum",
        role: "Content Marketing Associate",
        major: "D4 Teknik Telekomunikasi",
        img: "18hzPF6NDZZ1RYTTJ8NgSTk316UuEMJWn",
        socials: { linkedin: "", instagram: "rhmaniayu" },
      },
      {
        name: "Syifa Ayu Handayani",
        role: "Content Marketing Associate",
        major: "D3 Teknik Telekomunikasi",
        img: "1UqZ2rNW8vwLghuIVBXAdkXKzF0GM0cDh",
        socials: { linkedin: "", instagram: "ofmine.syf" },
      },
      {
        name: "Moch Yusuf Alidrus",
        role: "Content Marketing Associate",
        major: "D4 Teknik Elektro Industri",
        img: "1Yr9JjWy-T3CI0kJDvdlxbI8rybGFqDo3",
        socials: { linkedin: "", instagram: "ysaelidrus" },
      },
      {
        name: "Habibi Mulya Asmara",
        role: "Content Marketing Associate",
        major: "D4 Teknik Mekatronika",
        img: "",
        socials: { linkedin: "", instagram: "allboutabie" },
      },
    ],
  },
  // GD
  {
    id: "graphic-design",
    division: "Graphic Design",
    description:
      "Transforming ideas into visual masterpieces. Creating stunning designs that communicate the organization's identity and message.",
    members: [
      {
        name: "Dino Ariel Ihsan Saputra",
        role: "Head of Graphic Design",
        major: "D3 Teknik Informatika",
        img: "",
        socials: { linkedin: "", instagram: "dinoariels" },
      },
      {
        name: "Muhammad Fa'iz Al Fa'iruz Abady",
        role: "Graphic Design Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1KflxKoLCvNcTkD6hLozROmWdOiVy6u0k",
        socials: { linkedin: "", instagram: "faiz.fairuz_" },
      },
      {
        name: "Yahya Yazid Ilmany",
        role: "Graphic Design Associate",
        major: "D4 Sistem Pembangkit Energi",
        img: "1cgn1-GJE7jQlamANUgs3LFny1UwOEUQD",
        socials: { linkedin: "", instagram: "yaazudd" },
      },
      {
        name: "Vianda Clainere Yunior Lay",
        role: "Graphic Design Associate",
        major: "D4 Teknologi Game",
        img: "1fn0NFVzblaiE2vf86Bc0aAn36vk_ttQT",
        socials: { linkedin: "", instagram: "vi__anda" },
      },
      {
        name: "Adit Prasetyo",
        role: "Graphic Design Associate",
        major: "D4 Teknik Mekatronika",
        img: "19GtIFqmyAroSNR6NDB-ywym7MeIQE7A9",
        socials: { linkedin: "", instagram: "ditprss" },
      },
      {
        name: "Vierril Kevana Rizqullah",
        role: "Graphic Design Associate",
        major: "D4 Sains Data Terapan",
        img: "141V7ox5mcD_5PXsOq9KQzndbQTk0fezJ",
        socials: { linkedin: "", instagram: "vrl.kvnr" },
      },
      {
        name: "Muhammad Mikail Abdillah",
        role: "Graphic Design Associate",
        major: "D4 Teknik Mekatronika",
        img: "1RkRjmPZN5v5w7Dmp2g446USPUHfrd9qC",
        socials: { linkedin: "", instagram: "mikail_235" },
      },
      {
        name: "Mahira Sania Ardava",
        role: "Graphic Design Associate",
        major: "D3 Teknik Telekomunikasi",
        img: "1TNM8APhgyqCLc2uEQxLCOt1DGL6dqOiN",
        socials: { linkedin: "", instagram: "mahirasan.a" },
      },
      {
        name: "Muayyad Iffah Hudaya",
        role: "Graphic Design Associate",
        major: "D3 Teknik Telekomunikasi",
        img: "1UBBirr2wHyb_ij4Wij66iUDu01-o_a8i",
        socials: { linkedin: "", instagram: "iffahhudaya" },
      },
      {
        name: "Syaila Almira Purwanto",
        role: "Graphic Design Associate",
        major: "D4 Teknologi Rekayasa Multimedia",
        img: "1u651JeCxlTjx8_c9MWuxGinvo3myDhbk",
        socials: { linkedin: "", instagram: "syailaalmira" },
      },
      {
        name: "Rifansyah Al Farafis",
        role: "Graphic Design Associate",
        major: "D4 Teknologi Game",
        img: "1EMGYyLbnsctkF-c6XOBEKzu8QIjNWqVx",
        socials: { linkedin: "", instagram: "rifansyahalf" },
      },
      {
        name: "Anindya Rasyava Az Zahra",
        role: "Graphic Design Associate",
        major: "D4 Teknik Mekatronika",
        img: "1u5_4jgRNkxjY4RElWQIqaTupWelojp85",
        socials: { linkedin: "", instagram: "anindiae_" },
      },
    ],
  },
  // WD
  {
    id: "web-dev",
    division: "Web Development",
    description:
      "Building and maintaining digital infrastructure. Crafting seamless web experiences that power the organization's online presence.",
    members: [
      {
        name: "Tegar Aprilian",
        role: "Head of Web Development",
        major: "D3 Teknik Informatika",
        img: "1AuDzQUVLjakda65pLM77RDyNVwHcE93J",
        socials: { linkedin: "", instagram: "himdeunn" },
      },
      {
        name: "Muhammad Rillo Aditya Azka Saputra",
        role: "Web Development Associate",
        major: "D3 Teknik Informatika",
        img: "1iKwRZAIxzJ2hZLBhxgJu9Md6wKALTWqL",
        socials: { linkedin: "", instagram: "rwillow_" },
      },
      {
        name: "Djenar Virgiani Sayyid Nashrullah",
        role: "Web Development Associate",
        major: "D4 Teknik Elektronika",
        img: "1aVeAcpQi6Lo8FzwC3BkgkCMfYeCj2054",
        socials: { linkedin: "", instagram: "virgiant__" },
      },
      {
        name: "Acaryanandana Alif Fajar",
        role: "Web Development Associate",
        major: "D4 Sains Data Terapan",
        img: "1TiXLMQGw5I8fAqioeWPq3uzM9fr-kEQM",
        socials: { linkedin: "", instagram: "nandowwww__" },
      },
    ],
  },
];
