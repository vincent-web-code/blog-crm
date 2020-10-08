<template>
  <div>
    <el-container style="height: 100vh;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="this.$route.path" :default-openeds="['1']" :defaule-active="$route.path">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>内容管理</template
            >
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create" @click="toCateCreate">新建分类</el-menu-item>
              <el-menu-item index="/categories/list" @click="toCateList">分类列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/article/create" @click="toArtCreate">新建文章</el-menu-item>
              <el-menu-item index="/article/list" @click="toArtList">文章列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">评论</template>
              <el-menu-item index="/comment/list" @click="toComment">评论列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-s-tools"></i>系统设置</template
            >
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/adminUser/create" @click="toAdminUserCreate">新建管理员</el-menu-item>
              <el-menu-item index="/adminUser/list" @click="toAdminUserList">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toAdminUserList">查看</el-dropdown-item>
              <el-dropdown-item @click.native="toAdminUserCreate">新增</el-dropdown-item>
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{userName}}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Main extends Vue {
  get userName() {
    return localStorage.adminUserName
  };

  private toCateCreate(): void {
    this.$router.push('/categories/create')
  };
  private toCateList(): void {
    this.$router.push('/categories/list')
  };

  private toArtCreate(): void {
    this.$router.push('/article/create')
  };
  private toArtList(): void {
    this.$router.push('/article/list')
  };

  private toComment(): void {
    this.$router.push('/comment/list')
  };

  private toAdminUserCreate(): void {
    this.$router.push('/adminUser/create')
  };
  private toAdminUserList(): void {
    this.$router.push('/adminUser/list')
  };

  // 退出
  private logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUserName');
    this.$router.push("/login");

  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
