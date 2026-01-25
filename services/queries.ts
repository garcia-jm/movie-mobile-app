import { ID, Query } from "react-native-appwrite";
import { tables } from "./appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const res = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", query), Query.limit(1)],
    });

    if (res.rows.length > 0) {
      const existingMovie = res.rows[0];

      await tables.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        },
      });
    }

    if (res.rows.length <= 0) {
      await tables.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie?.id,
          title: movie?.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        },
      });
    }
  } catch (err) {
    console.error("An error occurred. ", err);
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const res = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });

    return res.rows as unknown as TrendingMovie[];
  } catch (err) {
    console.error("An error occurred. ", err);
    return undefined;
  }
};
