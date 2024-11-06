interface ListProgresProps {
  time: string;
  data: string;
  onDelete: () => void;
}

function ListProgres({ time, data, onDelete }: ListProgresProps) {
  const handleDelete = () => {
    onDelete();
  };
  return (
    <div className="bg-green-200 rounded-md p-2 font-medium font-serif flex justify-between items-center">
      <span className="font-semibold">{data}</span>
      <span className="font-semibold">{time}</span>
      <button type="button" onClick={handleDelete} className="text-green-600 hover:text-green-800">
        ✔️
      </button>
    </div>
  );
}

export default ListProgres;
