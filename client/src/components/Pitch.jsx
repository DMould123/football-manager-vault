import PlayerUpload from './PlayerUpload';

function Pitch({ formation, players, onPlayerUpload }) {
  const positions = getPositionsForFormation(formation);

  return (
    <div className="pitch">
      {positions.map((position) => (
        <div key={position.name} className="player-position" style={position.style}>
          <PlayerUpload
            position={position.name}
            imageUrl={players[position.name]}
            onUpload={(imageUrl) => onPlayerUpload(position.name, imageUrl)}
          />
        </div>
      ))}
    </div>
  );
}

function getPositionsForFormation(formation) {
  const basePositions = {
    GK: { top: '85%', left: '50%' },
    LB: { top: '70%', left: '20%' },
    CB1: { top: '75%', left: '35%' },
    CB2: { top: '75%', left: '65%' },
    RB: { top: '70%', left: '80%' },
    DM: { top: '60%', left: '50%' },
    CM1: { top: '45%', left: '35%' },
    CM2: { top: '45%', left: '65%' },
    LM: { top: '40%', left: '20%' },
    RM: { top: '40%', left: '80%' },
    LW: { top: '25%', left: '30%' },
    RW: { top: '25%', left: '70%' },
    ST: { top: '20%', left: '50%' },
    ST1: { top: '25%', left: '35%' },
    ST2: { top: '25%', left: '65%' },
  };

  const formationPositions = {
    '4-4-2': ['GK', 'LB', 'CB1', 'CB2', 'RB', 'LM', 'CM1', 'CM2', 'RM', 'ST1', 'ST2'],
    '4-3-3': ['GK', 'LB', 'CB1', 'CB2', 'RB', 'DM', 'CM1', 'CM2', 'LW', 'ST', 'RW'],
    '3-5-2': ['GK', 'CB1', 'CB2', 'CB3', 'LM', 'CM1', 'DM', 'CM2', 'RM', 'ST1', 'ST2'],
    '5-3-2': ['GK', 'LWB', 'CB1', 'CB2', 'CB3', 'RWB', 'CM1', 'DM', 'CM2', 'ST1', 'ST2'],
  };

  return formationPositions[formation].map(name => ({
    name,
    style: {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      ...basePositions[name]
    }
  }));
}

export default Pitch;
