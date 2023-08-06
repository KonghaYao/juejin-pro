import { createClient } from "@supabase/supabase-js";
import { localCache } from "../store/localCache";

const supabaseUrl = "https://wtiykjtiscarfltpprzu.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0aXlranRpc2NhcmZsdHBwcnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyODExNzksImV4cCI6MTk5ODg1NzE3OX0.BhPChs3q6LDUPFutMSlwesHSMVIyJjunsTuSevJ0Opk";
const supabase = createClient(supabaseUrl, supabaseKey);
export const API = {
    getTagList: localCache(async () => {
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
    }, "tags"),
    async getArticleSearch(params: {
        searchText: string;
        user_id?: string;
        tag_id?: string;
    }) {
        console.log(params);
        const req = supabase
            .from("article")

            .select("*");
        if (params.user_id) {
            req.eq("user_id", params.user_id);
        }
        if (params.tag_id)
            req.overlaps("tag_ids", [
                params.tag_id.slice(0, params.tag_id.length - 3) + "000",
            ]);
        if (params.searchText) {
            req.ilikeAllOf(
                "title",
                params.searchText
                    .split(/[,|，]/g)
                    .filter((i) => i)
                    .map((i) => `%${i.trim()}%`)
            );
        }
        const { data, error } = await req
            .limit(25)
            .order("view_count", { ascending: false });

        if (error) throw error;
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
    async getUserSearch(params: { searchText: string }) {
        const req = supabase.from("user").select("*");
        if (params.searchText) {
            req.ilikeAllOf(
                "user_name",
                params.searchText
                    .split(/[,|，]/g)
                    .filter((i) => i)
                    .map((i) => `%${i.trim()}%`)
            );
        }
        const { data, error } = await req
            .limit(25)
            .order("power", { ascending: false });

        if (error) throw error;
        console.log(data);
        return data as UserData[];
    },
    async getSingleUser(id: string) {
        const req = supabase.from("user").select("*");

        const { data, error } = await req.eq("user_name", id).single();
        if (error) throw error;
        return data as UserData;
    },
};
interface UserData {
    user_id: string;
    user_name: string;
    company: string;
    job_title: string;
    avatar_large: string;
    level: number;
    description: string;
    followee_count: number;
    follower_count: number;
    post_article_count: number;
    digg_article_count: number;
    got_digg_count: number;
    got_view_count: number;
    post_shortmsg_count: number;
    digg_shortmsg_count: number;
    isfollowed: boolean;
    favorable_author: number;
    power: number;
    study_point: number;
    identity: number;
    is_select_annual: boolean;
    select_annual_rank: number;
    annual_list_type: number;
    account_amount: number;
    is_vip: boolean;
    become_author_days: number;
    collection_set_article_count: number;
    recommend_article_count_daily: number;
    article_collect_count_daily: number;
}
