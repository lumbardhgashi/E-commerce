import { useEffect, useState } from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    pageSize?: string;
    load: any;
    page?: string
}

export const useQueryString = ({ load, pageSize = "16", page = "1" }: Props) => {
    const [filters, setFilters] = useState<any>({  pageSize });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        load(getQueryString());
        readQueryString();
    }, [location.search]);

    const readQueryString = () => {
        const qsFilters = qs.parse(location.search, { ignoreQueryPrefix: true });


        if (!qsFilters["pageSize"]) {
            qsFilters["pageSize"] = pageSize;
        }
        if (!qsFilters["page"]) {
            qsFilters["page"] = page;
        }

        setFilters({ ...qsFilters });
    };

    const getQueryString = (data = {}) => {

        const qsFilters = qs.parse(location.search, { ignoreQueryPrefix: true });


        if (!qsFilters["pageSize"]) {
            qsFilters["pageSize"] = pageSize;
        }
        if (!qsFilters["page"]) {
            qsFilters["page"] = page;
        }


        return qs.stringify(qsFilters, {
            addQueryPrefix: true,
            skipNulls: true,
        });
    }

    const onFilterChange = ({ name, value }: { name: string; value: any }) => {
        console.log(name, value);
        const newState = { ...filters };
        newState.page = 1;
        if (!value) {
            delete newState[name];
        } else {
            newState[name] = value;
        }

        confirmFilters(newState);
    };


    const confirmFilters = (data: any) => {
        pushHistory(data || filters);
    };

    const pushHistory = (filters: any) => {
        const query = { ...filters };

        const queryString = qs.stringify(query, {
            addQueryPrefix: true,
            skipNulls: true,
        });

        navigate({ search: queryString });
    };

    return { filters, onFilterChange, getQuery: getQueryString };
};
