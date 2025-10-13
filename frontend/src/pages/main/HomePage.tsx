import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Button from '../../components/common/Button';
import { ArrowRight, Calendar } from 'lucide-react';

const HomePage: React.FC = () => {
  const specialties = [
    {
      id: 1,
      name: 'Taro Sauce Jaune',
      description: 'Un volcan de Taro présenté de sauce jaune et de trip de chevron tenuée.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      tag: 'Plat du chef',
    },
    {
      id: 2,
      name: 'Homard Thermidor',
      description: 'Homard gratiné à la sauce thermidor, relevé d\'une pointe de cognac et d\'herbes fraîches.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      tag: 'Signature',
    },
    {
      id: 3,
      name: 'Triade de Brochette',
      description: 'Fournée de brochette de porc, boeuf, chèvre, poulet grillé et frit à la perfection.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      tag: 'Signature',
    },
  ];

  const events = [
    { name: 'Soirée Jazz', frequency: 'Tous les vendredis' },
    { name: 'Mini-jeux', frequency: 'Tous les samedis' },
  ];

  return (
    <Layout variant="main">
      {/* Hero Section */}
      <section
        className="hero relative min-h-screen flex items-center justify-center text-center py-24"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gold-500">
            Une Expérience Gastronomique Exceptionnelle
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'art culinaire dans un cadre raffiné où tradition et modernité se rencontrent pour créer des moments inoubliables.
          </p>
          
          <Link to="/menu">
            <Button
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="btn-primary text-xl px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white"
            >
              Découvrir Notre Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gray-850">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gold-500">
            Nos Spécialités
          </h2>
          
          <div className="specialties grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                className="specialty-card bg-gray-950 rounded-2xl overflow-hidden border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div 
                  className="specialty-img h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${specialty.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-gold-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {specialty.tag}
                  </span>
                </div>
                
                <div className="specialty-content p-6">
                  <h3 className="text-xl font-bold text-gold-500 mb-3">
                    {specialty.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {specialty.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events py-20 bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gold-500 mb-6">
              Événements Exclusifs
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Rejoignez-nous pour gagner des points de fidélité et manger d'excellents menus.
            </p>
          </div>
          
          <div className="event-cards grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {events.map((event) => (
              <div
                key={event.name}
                className="event-card bg-gray-950 rounded-2xl p-8 text-center border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="inline-block mb-4">
                  <Calendar className="text-gold-500" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gold-500 mb-2">{event.name}</h3>
                <p className="text-gray-300">{event.frequency}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
