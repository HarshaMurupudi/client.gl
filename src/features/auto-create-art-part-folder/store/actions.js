import { notifications } from "@mantine/notifications";
import baseAxios from "../../../apis/baseAxios";

export const createPartFolders = async (part) => {
  try {
    await baseAxios.post(`parts/art/folder/${part}`);

    notifications.show({
      title: "Success",
      message: "Folders created",
      color: "green",
    });
  } catch (error) {
    // console.log(error);
    if (error.response.data.message) {
      notifications.show({
        title: "Error",
        message: error.response.data.message,
        color: "red",
      });
    } else {
      notifications.show({
        title: "Error",
        message: "Failed to create folders",
        color: "red",
      });
    }
  }
};
