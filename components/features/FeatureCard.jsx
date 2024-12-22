import React from "react";
import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-3 items-center">
          <Icon className="h-6 w-6 text-blue-500" />
          <h3 className="font-medium text-gray-800 ">{title}</h3>
        </CardTitle>
        <CardDescription>
          {" "}
          <p className="text-sm text-gray-600">{description}</p>
        </CardDescription>
      </CardHeader>
      {/* <CardContent>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent> */}
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
    // <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
    //   <div className="flex-shrink-0">
    //     <Icon className="h-6 w-6 text-blue-500" />
    //   </div>
    //   <div>
    //     <h3 className="font-medium text-gray-800">{title}</h3>
    //     <p className="text-sm text-gray-600">{description}</p>
    //   </div>
    // </div>
  );
}
