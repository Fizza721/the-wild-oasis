import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create Cabin
  let query = supabase.from("cabins");

  // A. create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B. Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if uploading the image fails
  if (storageError) {
    if (data?.id) {
      await supabase.from("cabins").delete().eq("id", data.id);
    }

    console.error("Storage error:", storageError);

    throw new Error(
      `Cabin image could not be uploaded: ${storageError.message}`,
    );
  }

  return data;
}

export async function deleteCabin(id) {
  console.log("ID:", id);

  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
