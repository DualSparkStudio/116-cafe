import { useStore } from '../../store/store'
import Button from '../Button'
import './LocationHours.css'

const LocationHours = () => {
  const { siteContent } = useStore()

  const hours = [
    { day: 'Monday', time: siteContent.openingHours.monday },
    { day: 'Tuesday', time: siteContent.openingHours.tuesday },
    { day: 'Wednesday', time: siteContent.openingHours.wednesday },
    { day: 'Thursday', time: siteContent.openingHours.thursday },
    { day: 'Friday', time: siteContent.openingHours.friday },
    { day: 'Saturday', time: siteContent.openingHours.saturday },
    { day: 'Sunday', time: siteContent.openingHours.sunday }
  ]

  return (
    <section className="location-hours section" data-aos="fade-up">
      <div className="container">
        <div className="location-hours-content">
          <div className="location-hours-info">
            <h2 className="section-heading">Visit Us</h2>
            <div className="location-details">
              <div className="location-item">
                <h3>Address</h3>
                <p>{siteContent.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteContent.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="small">Open in Maps</Button>
                </a>
              </div>
              <div className="location-item">
                <h3>Phone</h3>
                <p>{siteContent.phone}</p>
                <a href={`tel:${siteContent.phone}`}>
                  <Button variant="ghost" size="small">Call Us</Button>
                </a>
              </div>
              <div className="location-item">
                <h3>Email</h3>
                <p>{siteContent.email}</p>
                <a href={`mailto:${siteContent.email}`}>
                  <Button variant="ghost" size="small">Send Email</Button>
                </a>
              </div>
            </div>
          </div>
          <div className="location-hours-schedule">
            <h3>Opening Hours</h3>
            <ul className="hours-list">
              {hours.map((item) => (
                <li key={item.day}>
                  <span className="hours-day">{item.day}</span>
                  <span className="hours-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="location-map">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteContent.address)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cafe Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationHours
