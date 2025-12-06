import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const data = await $http.get("/api/vendors").data;
        const vendorsArray = Array.isArray(data)
          ? data
          : (data && data.vendors) || [] || [];
        setVendors(vendorsArray);
      } catch (error) {
        console.error("Error fetching vendors", error);
        setVendors([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVendors();
  }, []);

  if (loading) return <p className="text-center p-4">Loading vendors...</p>;

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Vendors</h1>

      {vendors.length === 0 && (
        <p className="text-center text-gray-500">No vendors found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor, index) => (
          <Card key={index} className="shadow-lg rounded-2xl">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{vendor.name}</h2>
              {vendor.type && <p className="text-gray-600">{vendor.type}</p>}
              {vendor.location && (
                <p className="text-gray-600">{vendor.location}</p>
              )}

              <Button className="w-full mt-3">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
