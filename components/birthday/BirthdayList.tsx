import BirthdayCard from "./BirthdayCard";


export type Birthday = {
  id: string;
  first_name: string;
  last_name: string | null;
  date_of_birth: string;
  relationship: string;
  custom_relationship: string | null;
  created_by: string;
  created_at: string;
};


type Props = {
  birthdays: Birthday[];

  onEdit: (birthday: Birthday) => void;

  onDelete: (id: string) => void;
};

function getTurningAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth);

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

function getFullName(firstName: string, lastName: string | null): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

function getDisplayRelationship(relationship: string, customRelationship: string | null): string {
  if (relationship === 'Other' && customRelationship) {
    return customRelationship;
  }
  return relationship;
}

function humanizeDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function BirthdayList({ birthdays, onEdit, onDelete }: Props) {
  return (
    <div
      className="
      space-y-3
      "
    >
      {birthdays.map((birthday, index) => (
        <BirthdayCard
          key={birthday.id}
          name={getFullName(birthday.first_name, birthday.last_name)}
          date={humanizeDate(birthday.date_of_birth)}
          fullDate={birthday.date_of_birth}
          turning={getTurningAge(birthday.date_of_birth)}
          relationship={getDisplayRelationship(birthday.relationship, birthday.custom_relationship)}
          onEdit={() => onEdit(birthday)}
          onDelete={() => onDelete(birthday.id)}
          index={index}
        />
      ))}
    </div>
  );
}
