import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wtiykjtiscarfltpprzu.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0aXlranRpc2NhcmZsdHBwcnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyODExNzksImV4cCI6MTk5ODg1NzE3OX0.BhPChs3q6LDUPFutMSlwesHSMVIyJjunsTuSevJ0Opk";
const supabase = createClient(supabaseUrl, supabaseKey);
export const API = {
    async getTagList() {
        const { data, error } = await supabase.from("tag").select("*");
        if (error) throw error;
        return data as {
            back_ground: string;
            color: string;
            concern_user_count: number;
            ctime: string;
            icon: string;
            id: number;
            id_type: number;
            mtime: string;
            post_article_count: number;
            show_navi: number;
            tag_alias: string;
            tag_id: string;
            tag_name: string;
        }[];
    },
    async getArticleSearch(params: { searchText: string }) {
        const req = supabase
            .from("article")

            .select("*");
        if (params.searchText) {
            req.ilike("title", `%${params.searchText}%`);
        }
        const { data, error } = await req
            .limit(25)
            .order("view_count", { ascending: false });
        // .ilike("column", "%前端%");
        if (error) throw error;
        console.log(data);
        return data as {
            app_html_content: string;
            article_id: string;
            audit_status: number;
            brief_content: string;
            category_id: string;
            collect_count: number;
            comment_count: number;
            content: string;
            cover_image: string;
            ctime: string;
            digg_count: number;
            display_count: number;
            draft_id: string;
            hot_index: number;
            is_english: number;
            is_gfw: number;
            is_hot: number;
            is_markdown: number;
            is_original: number;
            link_url: string;
            mark_content: string;
            mtime: string;
            original_author: string;
            original_type: number;
            rank_index: number;
            rtime: string;
            status: number;
            tag_ids: string[];
            title: string;
            user_id: string;
            user_index: number;
            verify_status: number;
            view_count: number;
            visible_level: number;
        }[];
    },
};
