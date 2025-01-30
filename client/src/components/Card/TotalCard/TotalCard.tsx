import './styles.css';

function TotalCard({ total, title }: { total: number, title:string }) {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{ total }</div>
      </div>
    </div>
  );
}

export default TotalCard;
