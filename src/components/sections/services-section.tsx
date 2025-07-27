
interface Service {
  name: string;
  price: number | string;
}

interface ServicesData {
  manicure: Service[];
  pedicure: Service[];
  maniPedi: Service[];
  vipService: Service[];
  houseCall: Service[];
}

interface ServicesSectionProps {
  menuData: ServicesData;
}

interface ServiceCategoryProps {
  title: string;
  services: Service[];
  isLast?: boolean;
}

function ServiceCategory({ title, services, isLast = false }: ServiceCategoryProps) {
  return (
    <div className={`${!isLast ? "pb-16 md:pb-28" : ""}`}>
      <div className="mb-12 md:mb-16">
        <h3 className="text-2xl font-extralight tracking-[0.3em] text-gray-900 uppercase mb-4 md:mb-6">
          {title}
        </h3>
        <div className="h-px w-24 bg-gray-300/60 origin-left" />
      </div>
      
      <div className="space-y-1 md:space-y-2">
        {services.map((item, serviceIndex) => (
          <div 
            key={serviceIndex}
            className="group flex justify-between items-center py-4 md:py-6 transition-all duration-300 px-2 md:px-4 -mx-2 md:-mx-4"
          >
            <div className="flex-1">
              <span className="text-base md:text-lg font-light text-gray-600 group-hover:text-gray-900 leading-relaxed tracking-wide transition-colors duration-300">
                {item.name}
              </span>
            </div>
            
            <div className="ml-8 md:ml-12">
              <span className="text-base md:text-lg font-light text-gray-800 group-hover:text-gray-900 tracking-wider transition-colors duration-300">
                ${item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {!isLast && (
        <div className="mt-16 md:mt-28 h-px bg-gray-100/40 origin-center" />
      )}
    </div>
  );
}

export function ServicesSection({ menuData }: ServicesSectionProps) {
  return (
    <section className="w-full py-20 md:py-32 bg-white" id="services">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div>
          {/* Section Header */}
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-gray-900 mb-6">
              Services
            </h2>
            <div className="h-px w-32 bg-gray-300 mx-auto mb-8 origin-center" />
            <p className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
              Curated Experiences
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="max-w-4xl mx-auto space-y-0">
            <ServiceCategory title="Manicure" services={menuData.manicure} />
            <ServiceCategory title="Pedicure" services={menuData.pedicure} />
            <ServiceCategory title="Mani-Pedi" services={menuData.maniPedi} />
            <ServiceCategory title="VIP Service" services={menuData.vipService} />
            <ServiceCategory title="House Call" services={menuData.houseCall} isLast />
          </div>
        </div>
      </div>
    </section>
  );
}