import { turso } from "@/lib/db";

export default async function Home() {
  const db = await turso.execute("SELECT * FROM users");
  const users = db.rows;

  return (
    <div className="grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">  

      <div className="w-full max-w-4xl">
        <h2 className="text-xl mb-4">ユーザー一覧</h2>

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(users[0]).map((key) => (
                    <th key={key} className="px-4 py-2 text-left border-b">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    {Object.values(user).map((value, valueIndex) => (
                      <td key={valueIndex} className="px-4 py-2 border-b">
                        {value !== null ? String(value) : "NULL"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>ユーザーデータがありません</p>
        )}
      </div>

      <p className="text-sm text-gray-500">© 2025 Turso Demo</p>
    </div>
  );
}
