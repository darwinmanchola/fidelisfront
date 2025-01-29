import TableChurches from "@/components/Apps/Churches/TableChurches";
import { listChurches } from "@/services/churches";

const ChurchesPage = async () => {

    const churches= await listChurches();
  return (
    <div>
      <TableChurches rows={churches}/>
    </div>
   
  );
}
export default ChurchesPage;