import { turso } from "@/lib/db";
import { registerUser } from "./action";
import { Suspense } from "react";

export default async function Home() {
  const db = await turso.execute("SELECT * FROM users");
  const users = db.rows;

  return (
    <div className="grid grid-rows-[auto_auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* ユーザー登録フォーム */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl mb-4">ユーザー登録</h2>
        <form
          action={registerUser}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              年齢
            </label>
            <input
              type="number"
              id="age"
              name="age"
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            登録する
          </button>
        </form>
      </div>

      {/* ユーザー一覧 */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl mb-4">ユーザー一覧</h2>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
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
