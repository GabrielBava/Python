import { Link } from 'react-router-dom';
import styles from './ToolCard.module.css';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';
import { trackEvent, EVENTS } from '../../lib/analytics';

export default function ToolCard({ tool }) {
  return (
    <Card
      interactive
      as={Link}
      to={tool.route}
      className={styles.card}
      onClick={() => trackEvent(EVENTS.TOOL_VIEW, { tool: tool.id, placement: 'card' })}
    >
      <div className={styles.top}>
        <span className={styles.iconWrap}>
          <Icon name={tool.icon} size={22} />
        </span>
      </div>
      <span className={styles.title}>{tool.title}</span>
      <p className={styles.description}>{tool.description}</p>
      <div className={styles.badgeRow}>
        {tool.badges.map((badge) => (
          <Badge key={badge}>{badge}</Badge>
        ))}
      </div>
      <div className={styles.footer}>
        <Badge accent icon={<Icon name="arrow" size={14} />}>
          {tool.cta}
        </Badge>
      </div>
    </Card>
  );
}
