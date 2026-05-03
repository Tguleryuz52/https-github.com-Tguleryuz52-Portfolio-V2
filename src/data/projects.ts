export interface Project {
  id: string; // The URL slug (e.g., 'formula-vintage')
  title: string;
  year: string;
  desc: string; // Short description for cards
  overview: string; // Long description for the details page
  tags: string[];
  image: string; // Cover image for cards
  heroImage: string; // Big hero image for details page
  gallery: string[]; // Additional images for details page
}

export const projects: Project[] = [
  {
    id: "robotoy-home-robot",
    year: "2024",
    title: "Robotoy Home Robot",
    desc: "Geleceğin akıllı ev asistanı için organik ve kullanıcı dostu bir konsept. Soğuk teknolojiyi sıcak bir estetikle harmanlayarak, yapay zekayı günlük yaşamın doğal bir parçası haline getirdik.",
    overview: "Robotoy Home Robot projesinde, yapay zekanın fiziksel dünyadaki temsilini yeniden hayal ettik. Geleneksel, sert ve endüstriyel çizgilerden uzaklaşarak, ev ortamına uyum sağlayan ve kullanıcıyla duygusal bağ kurabilen organik, yumuşak formlar geliştirdik. Ürün tasarımından 3D görselleştirmesine kadar her detay, teknolojiyi evinizin en samimi üyesi yapmak üzere kurgulandı.",
    tags: ["3D Tasarım", "Endüstriyel Konsept", "Arayüz Tasarımı"],
    image: "/projects/heroImage.jpg",
    heroImage: "/projects/heroImage.jpg",
    gallery: [
      "/projects/gallery-gif.gif",
      "/projects/gallery-1.jpg",
      "/projects/gallery-2.jpeg"
    ]
  },
  {
    id: "sprey-zest",
    year: "2024",
    title: "Sprey Zest",
    desc: "Ambalaj ve marka kimliğine tamamen yeni, cesur bir yaklaşım. Sıkıcı standartların dışına çıkarak, her detayında enerji ve karakter barındıran kinetik bir tüketici deneyimi.",
    overview: "Sprey Zest projesi için ambalaj ve marka kimliğine eğlenceli ve cesur bir yaklaşım benimsedik. Tipik 'temiz ve taze' estetiğin dışına çıkarak, her detaya yüksek enerji ve karakter aşıladık. Raflarda anında dikkat çeken, tüketicinin ilgisini saniyeler içinde yakalayan kinetik bir deneyim tasarladık.",
    tags: ["Marka Kimliği", "Web Tasarımı", "3D Modelleme"],
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=100&w=3840&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=100&w=3840&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=100&w=3840&auto=format&fit=crop"
    ]
  },
  {
    id: "super-pro",
    year: "2020",
    title: "Super Pro",
    desc: "Modern vizyonerler için yeniden tanımlanmış profesyonellik. Başarı odaklı bu platformda, tasarımla estetiği ilham veren organik bir akışa dönüştürdük.",
    overview: "Super-Pro için sadece başarıya değil, başarının arkasındaki zihniyete ve kararlılığa odaklanarak profesyonel olmanın ne demek olduğunu yeniden tanımladık. Tasarım, sporcuların azmini ve tutkusunu öne çıkararak, mükemmellik için çabalayan herkesle yankı uyandıran cesur ve güçlendirici bir deneyim yarattı.",
    tags: ["Masaüstü App", "UI/UX Tasarımı"],
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=100&w=3840&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=100&w=3840&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512498559096-736b0de318f7?q=100&w=3840&auto=format&fit=crop"
    ]
  },
  {
    id: "architech-buildings",
    year: "2024",
    title: "Architech Buildings",
    desc: "Geleneksel mimari sınırlarına meydan okuyan avangard bir tasarım. Beklenmedik 3D formları harmanlayarak, sıradan alanları sanat eserlerine dönüştürdük.",
    overview: "Geleneksel sınırları yıkan bir tasarım felsefesiyle modern yaşam konseptini yeniden tanımladık. Konfor, işlevsellik ve beklenmedik mimari unsurlara odaklanarak sıradan olanı sıra dışı bir yapıya dönüştürdük. Mimariyi yalnızca bir yapı değil, ilham verici bir sanat eseri olarak ele aldık.",
    tags: ["Mobil Uygulama", "Marka Kimliği", "Web Tasarımı"],
    image: "https://images.unsplash.com/photo-1512498559096-736b0de318f7?q=100&w=3840&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1512498559096-736b0de318f7?q=100&w=3840&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=100&w=3840&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=100&w=3840&auto=format&fit=crop"
    ]
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export const getMoreProjects = (currentId: string, limit: number = 3): Project[] => {
  return projects.filter((p) => p.id !== currentId).slice(0, limit);
};
