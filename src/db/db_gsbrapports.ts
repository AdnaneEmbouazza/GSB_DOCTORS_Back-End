import { Pool } from "pg";

    const db = new Pool({
        host : `mysql:host=localhost`,
        dbname : `dbname=gsb_rapport`,
        username : `root`,
        mdp  : ``})