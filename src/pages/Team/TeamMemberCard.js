import React from 'react';

const TeamMemberCard = ({ image, name, designation, socialLinks }) => {
    return (
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          {/* dark-mode */}
        <div className="team-item text-center rounded overflow-hidden">
          <div className="rounded-circle overflow-hidden m-4">
            <img className="img-fluid" src={image} alt={name} />
          </div>
          <h5 className="mb-0">{name}</h5>
          <small>{designation}</small>
          <div className="d-flex justify-content-center mt-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                className="btn btn-square btn-primary mx-1"
                href={link.url} // Here you set the actual URL
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
}

export default TeamMemberCard;
