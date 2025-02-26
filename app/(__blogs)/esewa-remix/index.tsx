import { esewaRemix } from "@/app/(__blogs)/esewa-remix/esewaRemix";
import MarkdownRenderer from "../MarkdownRenderer";

export default function EsewaBlog() {
  return <MarkdownRenderer content={esewaRemix} />;
}
