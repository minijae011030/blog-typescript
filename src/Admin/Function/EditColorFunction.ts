import { EditColorFunctionProps } from "Admin/Type/AdminType";

export default async function EditColorFunction({
  color,
}: EditColorFunctionProps) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/user/profile/color`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        color: color.background,
      }),
    }
  );

  const res = await result.json();

  return res;
}
