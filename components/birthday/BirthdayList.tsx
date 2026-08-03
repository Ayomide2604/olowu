import BirthdayCard from "./BirthdayCard";


export type Birthday = {
  id: number;
  name: string;
  date: string;
  relationship: string;
  notes?: string;
  createdAt: Date;
};


type Props = {
  birthdays: Birthday[];

  onEdit: (birthday: Birthday) => void;

  onDelete: (id: number) => void;
};

function getTurningAge(date: string) {
  const birthDate = new Date(date);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  return age + 1;
}

export default function BirthdayList({ birthdays, onEdit, onDelete }: Props) {
  return (
    <div
      className="
      space-y-3
      "
    >
      {birthdays.map((birthday) => (
        <BirthdayCard
          key={birthday.id}
          name={birthday.name}
          date={birthday.date}
          turning={getTurningAge(birthday.date)}
          onEdit={() => onEdit(birthday)}
          onDelete={() => onDelete(birthday.id)}
        />
      ))}
    </div>
  );
}
