import { API_ROOT_URL } from "../consts/ApiUrl";
import { axiosPrivate } from "./axiosPrivate";

const fetchUserName = async (accountId: number) => {
    try {
      const res = await axiosPrivate.get(`${API_ROOT_URL}users/${accountId}`);
      return res.data.username;
    } catch (err) {
      console.log(err);
    }
  };

export const fetchDisplayName = async (accountId: number) => {
    try {
      const res = await axiosPrivate.get(
        `${API_ROOT_URL}users/${accountId}/profile`
      );
      return res.data.displayName
        ? res.data.displayName
        : fetchUserName(accountId);
    } catch (err) {
      console.log(err);
    }
  };