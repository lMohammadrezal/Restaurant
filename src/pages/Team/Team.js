import React from 'react';
import teamImage1 from '../../assets/img/team-1.jpg';
import teamImage2 from '../../assets/img/team-2.jpg';
import teamImage3 from '../../assets/img/team-3.jpg';
import teamImage4 from '../../assets/img/team-4.jpg';
import TeamMemberCard from './TeamMemberCard';

const Team = ({ limit }) => {
  const teamMembers = [
    { image: teamImage1, name: 'Full Name 1', designation: 'Chef', socialLinks: { facebook: 'facebook1', twitter: 'twitter1', instagram: 'instagram1' } },
    { image: teamImage2, name: 'Full Name 2', designation: 'Sous Chef', socialLinks: { facebook: 'facebook2', twitter: 'twitter2', instagram: 'instagram2' } },
    { image: teamImage3, name: 'Full Name 3', designation: 'Pastry Chef', socialLinks: { facebook: 'facebook3', twitter: 'twitter3', instagram: 'instagram3' } },
    { image: teamImage4, name: 'Full Name 4', designation: 'Head Chef', socialLinks: { facebook: 'facebook4', twitter: 'twitter4', instagram: 'instagram4' } },
    { image: teamImage1, name: 'Full Name 5', designation: 'Chef', socialLinks: { facebook: 'facebook5', twitter: 'twitter5', instagram: 'instagram5' } },
    { image: teamImage2, name: 'Full Name 6', designation: 'Sous Chef', socialLinks: { facebook: 'facebook6', twitter: 'twitter6', instagram: 'instagram6' } },
    { image: teamImage3, name: 'Full Name 7', designation: 'Pastry Chef', socialLinks: { facebook: 'facebook7', twitter: 'twitter7', instagram: 'instagram7' } },
    { image: teamImage4, name: 'Full Name 8', designation: 'Head Chef', socialLinks: { facebook: 'facebook8', twitter: 'twitter8', instagram: 'instagram8' } }
  ];

  // URL template
  const baseUrls = {
    facebook: 'https://www.facebook.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://www.instagram.com/'
  };

  // Limit team members if a limit prop is provided
  const displayedMembers = limit ? teamMembers.slice(0, limit) : teamMembers;

  return (
    <div>
      <div className="container-xxl pt-5 pb-3">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
            <h1 className="mb-5">Our Master Chefs</h1>
          </div>
          <div className="row g-4">
            {displayedMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                image={member.image}
                name={member.name}
                designation={member.designation}
                socialLinks={Object.keys(member.socialLinks).map(key => ({
                  icon: `fab fa-${key}`,
                  url: baseUrls[key] + member.socialLinks[key]
                }))}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
