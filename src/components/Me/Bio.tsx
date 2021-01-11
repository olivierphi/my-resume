import * as React from "react";
import { LangContext } from "../../contexts/LangContext";
import { I18N_DATA } from "../../data/i18n-data";
import { RESUME_DATA } from "../../data/resume-data";
import { parseISO as parseISODate, format as formatDate } from "date-fns";

export function MeBio(props: {}): React.ReactElement {
  const langCode = React.useContext(LangContext);

  const i18n = I18N_DATA[langCode];
  const bio = RESUME_DATA[langCode].bio;

  const birthDate = parseISODate(bio.birth);
  const dateFormat = i18n.date_format;

  return (
    <section className="me-container">
      {/* <HeaderIcon icon="/assets/img/icons/header-icons/user.svg" alt="me" /> */}

      <p>
        <span itemProp="name">{bio.name}</span>
      </p>

      <p className="sr-only">
        <span itemProp="jobTitle">{bio.jobTitle}</span>
      </p>

      {bio.nationality && (
        <p>
          {i18n.me.nationality} {bio.nationality}
        </p>
      )}

      <p>
        {i18n.me.birthDate}
        {formatDate(birthDate, dateFormat)}
      </p>

      <span itemProp="address">
        {bio.address.split("\n").map((addressLine, i) => {
          return (
            <span key={i}>
              {addressLine}
              <br />
            </span>
          );
        })}
      </span>

      <p>
        <a itemProp="email" href={`mailto:${bio.email}`}>
          {bio.email}
        </a>
      </p>

      <p>
        {i18n.me.phone}
        <span itemProp="telephone">{bio.phoneNumber}</span>
      </p>

      <p className="sr-only">
        <span itemProp="url">{bio.url}</span>
      </p>

      <p>
        <a itemProp="sameAs" href={`https://twitter.com/${bio.twitterId}`} target="_blank" className="twitter-link">
          twitter.com/RougeMine
        </a>
      </p>
    </section>
  );
}
