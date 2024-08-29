export default interface I_DBConnection {
    client: string | undefined;
    connection: {
      host: string | undefined;
      port: string | undefined;
      user: string | undefined;
      password: string | undefined;
      database: string | undefined;
    };
    pool?: {
      min: number;
      max: number;
    };
  }