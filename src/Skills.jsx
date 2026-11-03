import { skills } from './data/content';

function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-heading">
      <h2 className="section-header" id="skills-heading" data-aos="fade-up">
        Skills
      </h2>
      <div className="skills-groups" data-aos="fade-up">
        {skills.map(({ group, items }) => (
          <div key={group} className="skills-group">
            <h3 className="skills-group-title">{group}</h3>
            <ul className="skills-chips">
              {items.map((item) => (
                <li key={item} className="skills-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
