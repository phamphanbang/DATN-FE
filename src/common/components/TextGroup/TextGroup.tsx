import styles from './style.module.scss';

interface ITextGroup {
  label: string;
  content?: string | number | null;
  color?: string;
  dates?: string[];
}

export const TextGroup = ({ label, content, color, dates }: ITextGroup) => {

  return (
    <div className={styles.textGroup}>
      <label className={styles.label}>{label}</label>
      {!dates ? (
        <p
          className={`${styles.content} ${
            color ? styles[`content-${color}`] : ''
          }`}
        >
          {content}
        </p>
      ) : (
        <div className={styles.dates}>
          {dates &&
            dates.map((date, index) => (
              <p className={styles.date} key={index}>
                {date}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
